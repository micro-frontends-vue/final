import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import router from './router'
import store from './store'

console.log('ts - vue:', Vue.version)
console.log('ts - vue-router:', (VueRouter as any).version)
console.log('ts - vuex:', (Vuex as any).version)

const appOptions = {
  el: `#typescript`,
  router,
  store,
  render: (h: any) => h(App)
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions
})

export const bootstrap = [vueLifecycles.bootstrap]

export const mount = [vueLifecycles.mount]

export const unmount = [vueLifecycles.unmount]
