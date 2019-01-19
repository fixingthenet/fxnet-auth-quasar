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
    <q-field :error="passwordConfirmationFieldError()" error-label="Please confirm your password">
      <q-input type="password"  v-model="passwordConfirmation" float-label="Password confirmation"/>
    </q-field>
    <br/>
    <q-btn @click="login" :disable="loginFieldError() || passwordFieldError()" >Signup</q-btn>

  </q-page>
</template>


<script>
import authApi from '../lib/auth_api'

import {QInput,QField,
       } from 'quasar'

import store from '../store'

export default {
  name: 'PageIndex',
  components: {
  QInput,
  QField,
  },
  data() {
    return {
      loginName: '',
      password: '',
      passwordConfirmation: '',
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
    passwordConfirmationFieldError(){
      if (this.password != this.passwordConfirmation) {
       return true
      } else {
       return false
      }
    },
    login() {
      authApi.signup({
      login: this.loginName,
      password: this.password}).
      then(result => {
              console.log("Result", result)
              if (result.signup.errors) {
                this.$q.notify(`Error on signup: ${result.signup.errors.base}`);
              } else {
                this.$q.notify({
                  message:"You signed up successfully",
                  type: "positive"});
                }
              }
      ).
      catch(error => {
        console.log("Error", error);
        this.$q.notify("Bug/Error on signup");
      })
    }
  }
}
</script>
<style>
</style>
