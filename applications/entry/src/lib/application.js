const applications = []

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

function promiseQueue (promises) {
  async function queue () {
    const res = []
    for (const p of promises) {
      res.push(await p())
    }
    return res
  }

  return queue()
}

function filterActiveApplications () {
  return applications.filter(({ activeWhen }) => activeWhen(window.location))
}

function filterUnActiveApplications () {
  return applications.filter(({ activeWhen, response }) => response && !activeWhen(window.location))
}

export function getApplications () {
  return applications
}

async function match () {
  const activeApplications = filterActiveApplications()
  console.log('active:', activeApplications)
  for (const application of activeApplications) {
    await promiseQueue([
      async () => loadApplication(application.name),
      async () => bootstrapApplication(application.name),
      async () => unmountApplications(),
      async () => mountApplication(application.name)
    ])
  }
}

export async function start () {
  console.log('start app')
  match()
  window.addEventListener('popstate', (e) => {
    console.log('popstate, from start:', e)
    match()
  })
}

export async function registerApplication (appName, applicationOrLoadingFn, activityFn, customProps = {}) {
  applications.push({
    loadErrorTime: 0,
    name: appName,
    loadImpl: applicationOrLoadingFn,
    activeWhen: activityFn,
    status: NOT_LOADED,
    customProps
  })
}

export async function unregisterApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unregister')

  await unmountApplication(appName)
  await unloadApplication(appName)

  applications.splice(findApplicationIndex[appName], 1)
}

export function findApplicationIndex (appName) {
  return applications.findIndex(({ name }) => name === appName)
}

export function findApplication (appName) {
  return applications[findApplicationIndex(appName)]
}

export async function loadApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'load')

  application.status = NOT_BOOTSTRAPPED

  if (!application.response) {
    application.response = await application.loadImpl()
  }

  return application
}

export async function unloadApplication (appName, opts = { waitForUnmount: false }) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unload')
}

export async function bootstrapApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'bootstrap')

  const { bootstrap } = application.response

  return runHook(bootstrap)
}

export async function mountApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'mount')

  const { mount } = application.response

  return runHook(mount)
}

export async function unmountApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unmount')

  const { unmount } = application.response

  return runHook(unmount)
}

export async function unmountApplications () {
  const unActiveApplications = filterUnActiveApplications()
  console.log('unActive:', unActiveApplications)

  for (const application of unActiveApplications) {
    await unmountApplication(application.name)
  }
}

export function navigateToUrl (url) {
  console.log('navigate to:', url)
}

function ensureApplication (application, appName, scope) {
  if (!application) {
    throw new Error(`${scope} --- no application: ${appName}.`)
  }
}

function runHook (hooks) {
  if (Array.isArray(hooks)) {
    return Promise.all(hooks.map(hook => hook({})))
  } else {
    return hooks({})
  }
}
