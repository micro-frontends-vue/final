import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

console.log('ts - vue:', Vue.version)
console.log('ts - vue-router:', (VueRouter as any).version)
console.log('ts - vuex:', (Vuex as any).version)

let appInstance: Vue | null = null

const bootstrap = async () => { }
const mount = async (options: any = {}) => {
  if (appInstance) return

  const el = options.el

  appInstance = new Vue({
    router,
    store,
    render: (h: CreateElement) => h('div', { attrs: { id: el.substr(1) } }, [h(App)])
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
