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
     <router-view />
</q-page-container>
  </q-layout>
</template>


<script>
import {QLayout, QLayoutHeader, QPageContainer,
        QToolbar,QToolbarTitle,
        } from 'quasar'

import store from '../store'

export default {
  name: 'PageIndex',
  components: {
  QLayout,
  QLayoutHeader,
  QToolbar,QToolbarTitle,
  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      appName: this.$fx_config.app_name,
    }
  },
}
</script>
<style>
</style>
