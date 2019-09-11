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

  return application.loadImpl()
}

export async function unloadApplication (appName, opts = { waitForUnmount: false }) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unload')
}

export async function bootstrapApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'bootstrap')

  const { bootstrap } = await application.loadImpl()

  return runHook(bootstrap)
}

export async function mountApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'mount')

  const { mount } = await application.loadImpl()

  return runHook(mount)
}

export async function unmountApplication (appName) {
  const application = findApplication(appName)
  ensureApplication(application, appName, 'unmount')

  const { unmount } = await application.loadImpl()

  return runHook(unmount)
}

function ensureApplication (application, appName, scope) {
  if (!application) {
    throw new Error(`${scope} --- no application: ${appName}.`)
  }
}

function runHook (hook) {
  if (Array.isArray(hook)) {
    return Promise.all(hook.map(func => func()))
  } else {
    return hook()
  }
}
