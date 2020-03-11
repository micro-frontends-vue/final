import { startSingleSpa } from './lib/application'

window.NProgress.configure({ showSpinner: true })

const pathPrefix = (prefix) => (location) => {
  // console.log('path prefix:', prefix, location.hash)
  return location.hash.startsWith(`#${prefix}`)
}

startSingleSpa([
  {
    path: '/javascript',
    name: 'javascript',
    entries: ['http://localhost:10241/main.js'],
    activeWhen: pathPrefix('/javascript'),
    beforeLoad () {
      window.NProgress.start()
    },
    afterLoad () {
      window.NProgress.done(true)
    },
  },
  {
    path: '/typescript',
    name: 'typescript',
    entries: ['http://localhost:10242/main.js'],
    activeWhen: pathPrefix('/typescript'),
    beforeLoad () {
      window.NProgress.start()
    },
    afterLoad () {
      window.NProgress.done(true)
    },
  }
])
