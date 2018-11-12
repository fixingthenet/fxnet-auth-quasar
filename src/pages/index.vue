<template>
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
</template>


<script>
import Config from '../lib/config'
import authApi from '../lib/auth_api'

const config = new Config()
import {QInput,QField} from 'quasar'

export default {
  name: 'PageIndex',
  components: {
  QInput,
  QField
  },
  data() {
    return {
      loginName: '',
      password: '',
    }
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
      authApi.q.login({
      login: this.loginName,
      password: this.password}).
      then(result => {
              console.log("Result", result)
              if (result.sessionLogin.errors) {
                this.$q.notify("Error on login");
              } else {
              this.$q.notify({
              message:"Logged in",
              type: "positive"});
              }
              }
      ).
      catch(error => {
        console.log("Error", error);
        this.$q.notify("Error on login");
      })
    },
    disabled() {
     return true;
    }
  }
}
</script>
<style>
</style>
