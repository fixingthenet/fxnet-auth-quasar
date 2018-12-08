import Vue from 'vue'
import VueRouter from 'vue-router'
import Session from '../lib/session'
import routes from './routes'
import {LocalStorage} from 'quasar'

//import { LocalStorage } from 'quasar'
Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach((to,from,next) => {
  //console.log(from,to)
  var token = LocalStorage.get.item('login_token');
  var session = new Session(token)

  Router.session=session

  console.log("pubic route",to.meta.public)

  if (session.isExpired() && !to.meta.public) {
    Router.push({ path: '/login',
                  query: {next: from.path } })
    console.log("should login")
    next()
  } else {
    console.log("logged in or public")
    next()
  }
})
export default Router
