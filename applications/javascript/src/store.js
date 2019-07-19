export function generateStore (Vue, Vuex) {
  Vue.use(Vuex)
  return new Vuex.Store({
    state: {
      name: 'javascript'
    },
    mutations: {

    },
    actions: {

    }
  })
}
