import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import { generateRouter } from './router'
import { generateStore } from './store'

const appOptions = {
  el: `#javascript`,
  router: generateRouter(Vue, VueRouter),
  store: generateStore(Vue, Vuex),
  render: (h) => h(App)
}
const lifeCycles = singleSpaVue({ Vue, appOptions })

console.log('js - vue:', Vue.version)
console.log('js - vue-router:', VueRouter.version)
console.log('js - vuex:', Vuex.version)

window._applications.javascript = {
  bootstrap: [lifeCycles.bootstrap],
  mount: [lifeCycles.mount],
  unmount: [lifeCycles.unmount]
}

