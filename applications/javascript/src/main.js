import Vue from 'vue'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import router from './router'
import store from './store'

const appOptions = {
  el: `#javascript`,
  router,
  store,
  render: (h) => h(App)
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions
})

export const bootstrap = [vueLifecycles.bootstrap]

export const mount = [vueLifecycles.mount]

export const unmount = [vueLifecycles.unmount]
