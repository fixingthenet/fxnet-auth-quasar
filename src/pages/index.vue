<template>
  <q-page class="flex flex-center">
    <q-btn @click="login" >Login</q-btn>
  </q-page>
</template>


<script>
import Config from '../lib/config'
const config = new Config()

export default {
  name: 'PageIndex',
  data() {
    return {
      account: {}
    }
  },
  methods: {
    login() {
      console.log("Login start")
    }
  }
}
</script>
<style>
</style>
