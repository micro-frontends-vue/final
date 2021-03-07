import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import View from './View.vue'

const APP_NAME = require('../../package.json').name

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${APP_NAME}`,
    redirect: `/${APP_NAME}/home`,
    component: View,
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
          return import(/* webpackChunkName: 'about' */ '../views/About.vue')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
