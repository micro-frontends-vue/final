import { promiseQueue, runHook, loadModule } from './utils'

let routes = []
const applications = []
const cache = Object.create(null)
const slotElementSelector = '#sub-app-wrapper'

window.applications = applications
window._applications = Object.create(null)

// App statuses
export const NOT_LOADED = 'NOT_LOADED'
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED'
export const BOOTSTRAPPING = 'BOOTSTRAPPING'
export const NOT_MOUNTED = 'NOT_MOUNTED'
export const MOUNTING = 'MOUNTING'
export const MOUNTED = 'MOUNTED'
export const UPDATING = 'UPDATING'
export const UNMOUNTING = 'UNMOUNTING'
export const UNLOADING = 'UNLOADING'
export const LOAD_ERROR = 'LOAD_ERROR'
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'

const loadApplicationFn = async () => {
  const hashStr = window.location.hash.substring(1)

  if (!hashStr) return

  const route = routes.find(({ path }) => hashStr.startsWith(path))

  if (!route) return
  if (cache[route.name]) return

  const r = await window.System.import(route.entries[0])
  // await loadModule(route.entries[0])

  // console.log(r)

  const application = r.default

  cache[route.name] = application

  if (typeof application.render === 'function') {
    const app = application.render()
    // console.log(route.name, app)
    return app
  }

  return application
}


const ensureApplication = (application, appName, scope) => {
  if (!application) {
    throw new Error(`${scope} --- no application: ${appName}.`)
  }
}

const findApplicationIndex = (appName) => {
  return applications.findIndex(({ name }) => name === appName)
}

const filterActiveApplications = () => {
  return applications.filter(({ activeWhen }) => activeWhen(window.location))
}

const filterUnActiveApplications = () => {
  return applications.filter(({ activeWhen, response }) => response && !activeWhen(window.location))
}

const match = async () => {
  const activeApplications = filterActiveApplications()
  // console.log('active:', activeApplications)
  for (const { name } of activeApplications) {
    await promiseQueue([
      async () => loadApplication(name),
      async () => bootstrapApplication(name),
      async () => unmountApplications(),
      async () => mountApplication(name)
    ])
  }
}

export const findApplication = (appName) => {
  return applications[findApplicationIndex(appName)]
}

export const registerApplication = async (application) => {
  const {
    name,
    el,
    activeWhen,
    customProps = {},
    beforeLoad = null,
    afterLoad = null,
  } = application

  applications.push({
    loadErrorTime: 0,
    status: NOT_LOADED,
    name,
    el,
    loadImpl: () => loadApplicationFn(),
    activeWhen,
    customProps,
    beforeLoad,
    afterLoad
  })
}

export const unregisterApplication = async (appName) => {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unregister')

  await unmountApplication(appName)
  await unloadApplication(appName)

  applications.splice(findApplicationIndex[appName], 1)
}

export const loadApplication = async (appName) => {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'load')

  application.status = NOT_BOOTSTRAPPED

  if (!application.response) {
    if (typeof application.beforeLoad === 'function') {
      await application.beforeLoad()
    }
    application.response = await application.loadImpl()
    if (typeof application.afterLoad === 'function') {
      await application.afterLoad()
    }
  }

  return application
}

export const unloadApplication = async (appName, opts = { waitForUnmount: false }) => {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unload')

  // TODO: ...
}

export const bootstrapApplication = async (appName) => {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'bootstrap')

  const { bootstrap } = application.response
  return runHook(bootstrap)
}

export const mountApplication = async (appName) => {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'mount')

  const { mount } = application.response
  const res = await runHook(mount, { el: application.el || slotElementSelector })
  return res
}

export const unmountApplication = async (appName) => {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unmount')

  const { unmount } = application.response
  return runHook(unmount)
}

export const unmountApplications = async () => {
  const unActiveApplications = filterUnActiveApplications()

  for (const application of unActiveApplications) {
    await unmountApplication(application.name)
  }
}

export const start = async () => {
  console.log('start app')
  match()
  window.addEventListener('hashchange', (e) => {
    // console.log('hashchange:', e)
    match()
  })
}

export const startSingleSpa = (_routes = []) => {
  (routes = _routes).forEach(({ name, el, activeWhen, beforeLoad, afterLoad }) => {
    registerApplication({
      name,
      el,
      activeWhen,
      beforeLoad,
      afterLoad
    })
  })

  start() // 启动 single-spa
}

export const getApplications = () => {
  return applications
}

export const navigateToUrl = (url) => {
  console.log('navigate to:', url)
}
