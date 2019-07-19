import * as singleSpa from 'single-spa'
import modules from './modules'

const { registerApplication, start } = singleSpa
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

  const { default: application } = await window.System.import(`/${name}/main.js`)
  cache[name] = application

  console.log(name, application)

  window.NProgress.done(true)

  if (typeof application.render === 'function') {
    const app = application.render()
    console.log(name, app)
    return app
  }

  return application
}

start() // 启动 single-spa

window.NProgress.configure({ showSpinner: true })
window._singleSpa = singleSpa
window._applications = cache

registerApplication(
  'javascript',
  () => loadApplication('javascript'),
  pathPrefix('/javascript')
)

registerApplication(
  'typescript',
  () => loadApplication('typescript'),
  pathPrefix('/typescript')
)
