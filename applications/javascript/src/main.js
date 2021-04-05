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
const mount = async (options = {}) => {
  if (appInstance) return

  const el = options.el

  appInstance = new Vue({
    router: generateRouter(Vue, VueRouter),
    store: generateStore(Vue, Vuex),
    render: (h) => h('div', { attrs: { id: el.substr(1) } }, [h(App)])
  })
  appInstance.$mount(document.querySelector(el))
}
const unmount = async () => {
  if (appInstance) {
    appInstance.$destroy()
    appInstance.$el.innerHTML = ''
    appInstance = null
  }
}

export default {
  bootstrap: [bootstrap],
  mount: [mount],
  unmount: [unmount]
}
