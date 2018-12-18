<template>
  <q-page class="center">
    <q-field
       :error="errors.has('currentPassword')"
       :error-label="errors.first('currentPassword')">
    <q-input
      v-validate.immediate="'required'"
      type="password"
      name='currentPassword'
      v-model="currentPassword"
      float-label="Current Password"/>
    </q-field>
    <br/>
    <q-field
        :error="errors.has('newPassword')"
        :error-label="errors.first('newPassword')">
    <q-input
      v-validate.immediate="'required'"
      name='newPassword'
      type="password"
      v-model="newPassword"
      float-label="New Password"/>
    </q-field>
          <br/>
    <q-field
    :error="errors.has('newPasswordConfirmation')"
    :error-label="errors.first('newPasswordConfirmation')">
    <q-input type="password"
      v-validate.immediate="'required|samePassword'"
      name="newPasswordConfirmation"
      v-model="newPasswordConfirmation"
      float-label="New Password Confirmation"/>
    </q-field>
    <br/>

<q-btn @click="change" :disable="errors.any()" >Change</q-btn>
  </q-page>
</template>


<script>
import Config from '../lib/config'
import authApi from '../lib/auth_api'
import { Validator } from 'vee-validate';
const dict = {
  custom: {
    currentPassword: {
      required: 'Your current password is empty'
    },
    newPassword: {
      required: 'Your new password is empty'
    },
    newPasswordConfirmation: {
      required: 'You have to confirm the new password'
    }
  }
};

Validator.localize('en', dict);

const config = new Config()
import {QInput,QField} from 'quasar'
import store from '../store'
export default {
  name: 'PageIndex',
  components: {
  QInput,
  QField
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }
  },

 computed: {

  },
  created() {
    Validator.extend('samePassword',
    {
      getMessage: (field) => {
        return 'The new passwords have to be the same'
      },
      validate: (value) => {
        return value == this.newPassword
      }
    });
  },
  methods: {
    change() {
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
                this.redirectToNext()
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
