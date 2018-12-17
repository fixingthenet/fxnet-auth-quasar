<template>
  <q-page class="center">
    <q-card>
      <q-card-title>
        Session
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        Session expires {{session.toString()}}
      </q-card-main>
    </q-card>
  </q-page>
</template>


<script>
import Config from '../lib/config'
import authApi from '../lib/auth_api'
import Session from '../lib/session'

const config = new Config()
import {QInput,QField, QCard, QCardMain,
QCardTitle, QCardMedia,
QCardSeparator, QCardActions} from 'quasar'

export default {
  name: 'PageIndex',
  components: {
  QInput,
  QField,
  QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QCardSeparator,
    QCardActions
  },
  data() {
    return {
      loginName: '',
      password: '',
    }
  },
  computed: {
    session() {return this.$store.state.session.session}
  }
}
</script>
<style>
</style>
