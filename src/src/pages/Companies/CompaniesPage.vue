<script setup>
import CompaniesList from 'src/components/companies/CompanyList.vue'

import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <!-- content -->
      <h1>Empresas</h1>
      <div>
        <q-btn v-if="store.isAdmin" unelevated color="primary" label="Adicionar" :to="`companies/add`" />
      </div>
      <CompaniesList />
    </div>
  </q-page>
</template>
