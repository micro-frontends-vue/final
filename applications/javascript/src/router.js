import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const APP_NAME = require('../package.json').name

export default new Router({
  routes: [{
    path: `/${APP_NAME}`,
    redirect: `/${APP_NAME}/home`,
    component: {
      render (h) {
        return h('router-view')
      }
    },
    children: [
      {
        path: `home`,
        component: Home
      },
      {
        path: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: 'about' */ './views/About.vue')
        }
      }
    ]
  }]
})
