<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
<q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
<q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>
</q-toolbar>
    </q-layout-header>
    <q-page-container>
  <q-page class="center">
  <q-field :error="loginFieldError()" error-label="Please enter your login">
      <q-input type="text" lower-case v-model="loginName" float-label="Login" autofocus/>
  </q-field>
      <br/>
        <q-field :error="passwordFieldError()" error-label="Please enter your password">
    <q-input type="password"  v-model="password" float-label="Password"/>
    </q-field>
          <br/>
    <q-btn @click="login" :disable="loginFieldError() || passwordFieldError()" >Login</q-btn>

  </q-page>
  </q-page-container>
  </q-layout>
</template>


<script>
import Config from '../lib/config'
import authApi from '../lib/auth_api'

const config = new Config()

var nextUrl= function(target,token) {
   if (target && target.match(/^http.?:/)) {
     window.location.href=target+"?token="+token
   } else {
     return target || '/'
   }
}
import {QLayout, QLayoutHeader, QPageContainer,
        QInput,QField,
        QToolbar,QToolbarTitle,
        } from 'quasar'
import store from '../store'
export default {
  name: 'PageIndex',
  components: {
  QInput,
  QField,
  QLayout,
  QLayoutHeader,
  QToolbar,QToolbarTitle,
  },
  data() {
    return {
      loginName: '',
      password: '',
      leftDrawerOpen: this.$q.platform.is.desktop,
      appName: config.get('app_name')

    }
  },
  beforeRouteEnter(to,from,next) {
    console.log("checking login")
    var session=store.state.session.session;
     if (session.isExpired()) {
       console.log("expired")
       next()
     } else {
       console.log("still logged in")
       next({path: nextUrl(to.query.next,session.token)})
    }
  },

 computed: {

  },
  methods: {
    loginFieldError(){
      if (this.loginName.length < 1) {
       return true
      } else {
       return false
      }
    },

    passwordFieldError(){
      if (this.password.length < 1) {
       return true
      } else {
       return false
      }
    },
    login() {
      authApi.login({
      login: this.loginName,
      password: this.password}).
      then(result => {
              console.log("Result", result)
              if (result.sessionLogin.errors) {
                this.$q.notify("Error on login");
              } else {
                this.$store.commit('session/login',result.sessionLogin.token);
                this.$q.notify({
                  message:"Logged in",
                  type: "positive"});
                }
                this.$router.push({path:
                this.nextUrl(this.$route.query.next,
                result.sessionLogin.token)})
              }
      ).
      catch(error => {
        console.log("Error", error);
        this.$q.notify("Error on login");
      })
    }
  }
}
</script>
<style>
</style>
