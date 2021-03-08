import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import { generateRouter } from './router'
import { generateStore } from './store'

console.log('js - vue:', Vue.version)
console.log('js - vue-router:', VueRouter.version)
console.log('js - vuex:', Vuex.version)

let appInstance = null

const bootstrap = async () => { }
const mount = async () => {
  if (appInstance) return

  appInstance = new Vue({
    router: generateRouter(Vue, VueRouter),
    store: generateStore(Vue, Vuex),
    render: (h) => h('div', { attrs: { id: 'javascript' } }, [h(App)])
  })
  appInstance.$mount('#javascript')
}
const unmount = async () => {
  if (appInstance) {
    appInstance.$destroy()
    appInstance.$el.innerHTML = ''
    appInstance = null
  }
}

window._applications.javascript = {
  bootstrap: [bootstrap],
  mount: [mount],
  unmount: [unmount]
}

