import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import router from './router'
import store from './store'

const appOptions = {
  el: `#typescript`,
  router,
  store,
  render: (h: CreateElement) => h(App)
}
const lifeCycles = singleSpaVue({ Vue, appOptions })

console.log('ts - vue:', Vue.version)
console.log('ts - vue-router:', (VueRouter as any).version)
console.log('ts - vuex:', (Vuex as any).version)

window._applications.typescript = {
  bootstrap: [lifeCycles.bootstrap],
  mount: [lifeCycles.mount],
  unmount: [lifeCycles.unmount]
}
