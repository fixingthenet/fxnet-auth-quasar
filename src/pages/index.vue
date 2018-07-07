<template>
  <q-page class="flex flex-center">
    <q-btn @click="login" >Login</q-btn>
    ({{account.email}})
    <div v-if="$apollo.loading">Loading...</div>
  </q-page>
</template>

<style>
</style>

<script>
import gql from 'graphql-tag'
import Config from '../lib/config'
const config = new Config({ok: "yes"})

export default {
  name: 'PageIndex',
  data() {
    return {
      account: {}
    }
  },
  apollo: {
    xaccount: {
      query: gql`{
               account(id: 2){
                 email
                 id
               }
             }`,
             
      variables: {
        accounId: 2,
      },   
    }
  },
  methods: {
    login() {
      console.log("Login start")
      var client = this.$apollo.provider.defaultClient
      client.query(
      {
        query: gql`{
                account(id: 2){
                            email
                            id
                            }
                  }`,
             
       variables: {
        accounId: 2,
      },   
    }).then((result) => {
      this.account=result.data.account
      console.log("Login", client, result.data.account)
      console.log(config.get('ok'))
    })
   }
  }
}
</script>
