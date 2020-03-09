// import * as singleSpa from 'single-spa'
import * as singleSpa from './lib/application'
import modules from './modules'

window.NProgress.configure({ showSpinner: true })

const { registerApplication, start, navigateToUrl } = singleSpa
const cache = Object.create(null)

const pathPrefix = (prefix) => (location) => {
  // console.log('path prefix:', prefix, location.hash)
  return location.hash.startsWith(`#${prefix}`)
}

const loadApplication = async () => {
  const hashStr = window.location.hash

  if (!hashStr) return

  const [, name] = hashStr.split('/')

  if (!name) return
  if (!modules.includes(name)) return
  if (cache[name]) return

  window.NProgress.start()

  const { default: application } = await window.System.import(`./${name}/main.js`)
  cache[name] = application

  // console.log(name, application)

  window.NProgress.done(true)

  if (typeof application.render === 'function') {
    const app = application.render()
    // console.log(name, app)
    return app
  }

  return application
}

const navigateToApplication = async (name) => {
  console.log('navigateToApplication', name)

  // if (modules.includes(name) && !cache[name]) {
  //   console.log('await load application', name)
  //   await window.System.import(`/${name}/main.js`)
  // }

  console.log('after load application', name)

  navigateToUrl(`#/${name}`)
}

const routes = [
  {
    path: '/javascript',
    name: 'javascript',
    application: () => loadApplication('javascript')
  },
  {
    path: '/typescript',
    name: 'typescript',
    application: () => loadApplication('typescript')
  }
]

const startSingleSpa = (routes = []) => {
  routes.forEach(({ path, name, application }) => {
    registerApplication(name, application, pathPrefix(path))
  })

  start() // 启动 single-spa
}

startSingleSpa(routes)

window.navigateToApplication = navigateToApplication
window._applications = cache
