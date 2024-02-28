<script setup>
import CompaniesList from 'src/components/companies/CompanyList.vue'

import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row items-center q-gutter-md no-wrap">
        <div>
          <h1 class="text-h6">Empresas</h1>
        </div>
        <q-btn v-if="store.isAdmin" dense unelevated color="primary" icon="add" :to="'companies/add'" />
      </div>
      <CompaniesList />
    </div>
  </q-page>
</template>
