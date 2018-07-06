<template>
  <q-page class="flex flex-center">
    <q-btn @click="login" >Login</q-btn>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  
  methods: {
    login() {
      console.log("Login")
    }
  }
}
</script>
