<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          G-Est
        </q-toolbar-title>

        <q-btn :to="`/users/${store.userInfo.id}`" color="white" text-color="primary">{{ store.userInfo.name }}</q-btn>
        <q-btn @click="logout" class="q-ml-md" color="white" text-color="primary">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import tokenAPI from "../services/fetches/token.js";
import Router from '../router'
import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
const essentialLinks = [
  {
    title: 'Solicitações',
    icon: 'mail',
    link: '/applications'
  },
  {
    title: 'Turmas',
    icon: 'groups',
    link: '/classes'
  },
  {
    title: 'Empresas',
    icon: 'apartment',
    link: '/companies'
  },
  {
    title: 'Cursos',
    icon: 'school',
    link: '/courses'
  },
  {
    title: 'Coordenadores',
    icon: 'person',
    link: '/coordinators'
  },
]
if(store.isAdmin){
  essentialLinks.push({
    title: 'Utilizadores',
    icon: 'people',
    link: '/users'
  })
}


const leftDrawerOpen = ref(false)
const router = Router()

async function logout() {
  await tokenAPI.logout()
  await router.push({path: 'login'})
  router.go()
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
