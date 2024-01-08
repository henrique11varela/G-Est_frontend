<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          G-est
        </q-toolbar-title>

        <div>Data</div>
        <q-btn v-if="loginStore.token == ''" :to="{path: 'login'}">Login</q-btn>
        <q-btn v-else @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useLoginStore } from '../stores/login.js'
import Router from '../router'

const linksList = [
  {
    title: 'Solicitações',
    icon: 'school',
    link: '/applications'
  },
  {
    title: 'Turmas',
    icon: 'school',
    link: '/classes'
  },
  {
    title: 'Alunos',
    icon: 'school',
    link: '/students'
  },
  {
    title: 'Estágios',
    icon: 'school',
    link: '/internships'
  },
  {
    title: 'Empresas',
    icon: 'school',
    link: '/companies'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const loginStore = useLoginStore()
    const router = Router()

    function logout() {
      loginStore.logout()
      router.push({path: 'login'})
      router.go()
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loginStore,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
