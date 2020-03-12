<template>
  <div class="app">
    <div class="nav">
      <router-link to="/typescript/home">Home</router-link>
      <span> | </span>
      <router-link to="/typescript/about">About</router-link>
    </div>

    <p class="versions">
      <span>Vue: {{ vueVersion }}</span>
      <span>VueRouter: {{ vueRouterVersion }}</span>
      <span>Vuex: {{ vuexVersion }}</span>
    </p>

    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

export default {
  data() {
    return {
      vueVersion: Vue.version,
      vueRouterVersion: VueRouter.version,
      vuexVersion: Vuex.version
    };
  }
};
</script>

<style scoped>
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

.versions > span {
  font-size: 14px;
  color: #999;
}

.versions > span + span {
  margin-left: 10px;
}
</style>
