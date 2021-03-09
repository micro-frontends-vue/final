import { startSingleSpa } from './lib/application'

window.NProgress.configure({ showSpinner: true })

console.log(process.env.NODE_ENV)

const isProd = process.env.NODE_ENV === 'production'

const pathPrefix = (prefix) => (location) => {
  // console.log('path prefix:', prefix, location.hash)
  return location.hash.startsWith(`#${prefix}`)
}

startSingleSpa([
  {
    path: '/javascript',
    name: 'javascript',
    entries: [`${isProd ? './javascript' : 'http://localhost:10241'}/main.js`],
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
    entries: [`${isProd ? './typescript' : 'http://localhost:10242'}/main.js`],
    activeWhen: pathPrefix('/typescript'),
    beforeLoad () {
      window.NProgress.start()
    },
    afterLoad () {
      window.NProgress.done(true)
    },
  },
  {
    path: '/vue3',
    name: 'vue3',
    entries: [`${isProd ? './vue3' : 'http://localhost:10243'}/main.js`],
    activeWhen: pathPrefix('/vue3'),
    beforeLoad () {
      window.NProgress.start()
    },
    afterLoad () {
      window.NProgress.done(true)
    },
  },
  {
    path: '/react17',
    name: 'react17',
    entries: [`${isProd ? './react17' : 'http://localhost:10244'}/main.js`],
    activeWhen: pathPrefix('/react17'),
    beforeLoad () {
      window.NProgress.start()
    },
    afterLoad () {
      window.NProgress.done(true)
    },
  }
])
