<template>
  <q-page class="center">
    expires {{session.toString()}}; {{session.isExpired()}}
  </q-page>
</template>


<script>
import Config from '../lib/config'
import authApi from '../lib/auth_api'
import Session from '../lib/session'

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
  computed: {
    session() {return this.$router.session}
  }
}
</script>
<style>
</style>
