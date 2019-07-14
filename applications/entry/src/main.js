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

  registerApplication(
    name,
    application,
    pathPrefix(`/${name}`)
  )

  window.NProgress.done(true)
}

const loadApplications = () => {
  loadApplication()

  window.addEventListener('hashchange', () => {
    loadApplication()
  })
}

window.NProgress.configure({ showSpinner: true })

loadApplications() // 监听 hash 加载子项目
start() // 启动 single-spa

window._singleSpa = singleSpa
window._applicationCache = cache
