import { createApp, App, version as VueVersion } from 'vue'
// import VueRouter from 'vue-router'
import Vuex from 'vuex'
import AppComponent from './App.vue'
import router from './router'
import store from './store'

console.log('vue3 - vue:', VueVersion)
// console.log('v3 - vue-router:', (VueRouter as any).version)
console.log('vue3 - vuex:', (Vuex as any).version)

let appInstance: App | null = null

const bootstrap = async () => { }
const mount = async (options: any = {}) => {
  if (appInstance) return

  const el = options.el

  appInstance = createApp(AppComponent).use(router).use(store)
  appInstance.mount(document.querySelector(el))
}
const unmount = async () => {
  if (appInstance) {
    appInstance.unmount()
    appInstance = null
  }
}

export default {
  bootstrap: [bootstrap],
  mount: [mount],
  unmount: [unmount]
}
