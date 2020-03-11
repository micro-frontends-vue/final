// import * as singleSpa from 'single-spa'
import * as singleSpa from './lib/application'

window.NProgress.configure({ showSpinner: true })

window._applications = Object.create(null)

const { registerApplication, start, navigateToUrl } = singleSpa
const cache = Object.create(null)

const pathPrefix = (prefix) => (location) => {
  // console.log('path prefix:', prefix, location.hash)
  return location.hash.startsWith(`#${prefix}`)
}

const loadModule = (url) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = ({ type }) => resolve({ status: type, url });
    script.onerror = ({ type }) => resolve({ status: type, url });
    script.src = url;
    document.body.appendChild(script);
  });
}

const routes = [
  {
    path: '/javascript',
    name: 'javascript',
    entries: ['http://localhost:10241/main.js'],
  },
  {
    path: '/typescript',
    name: 'typescript',
    entries: ['http://localhost:10242/main.js'],
  }
]

const loadApplication = async () => {
  const hashStr = window.location.hash.substring(1)

  if (!hashStr) return

  const route = routes.find(({ path }) => hashStr.startsWith(path))

  if (!route) return
  if (cache[route.name]) return

  window.NProgress.start()

  await loadModule(route.entries[0])

  const application = window._applications[route.name]

  cache[route.name] = application

  window.NProgress.done(true)

  if (typeof application.render === 'function') {
    const app = application.render()
    console.log(name, app)
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

const startSingleSpa = (routes = []) => {
  routes.forEach(({ path, name }) => {
    registerApplication(name, () => loadApplication(), pathPrefix(path))
  })

  start() // 启动 single-spa
}

startSingleSpa(routes)

window.navigateToApplication = navigateToApplication
// window._applications = cache
