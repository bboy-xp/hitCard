// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import HelloFromVux from './components/HelloFromVux'
import Me from './components/Me'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Me
},
{
  path: '/HelloFromVux',
  component: HelloFromVux
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
