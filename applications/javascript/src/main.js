import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import { generateRouter } from './router'
import { generateStore } from './store'

export default {
  name: 'javascirpt',
  render (inject = {}) {
    const { _Vue = Vue, _VueRouter = VueRouter, _Vuex = Vuex } = inject
    const appOptions = {
      el: `#javascript`,
      router: generateRouter(_Vue, _VueRouter),
      store: generateStore(_Vue, _Vuex),
      render: (h) => h(App)
    }
    const vueLifecycles = singleSpaVue({ Vue: _Vue, appOptions })

    console.log('js - vue:', _Vue.version)
    console.log('js - vue-router:', _VueRouter.version)
    console.log('js - vuex:', _Vuex.version)

    return {
      bootstrap: [vueLifecycles.bootstrap],
      mount: [vueLifecycles.mount],
      unmount: [vueLifecycles.unmount]
    }
  }
}
