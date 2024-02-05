<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import Router from 'src/router/index.js';
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
const $q = useQuasar()
const router = Router();
const edit = ref(false)
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <span class="text-h5">Adicionar empresa</span>
      <CompanyFrom :edit="edit" @submit-Company="addCompany" />
    </div>
  </q-page>
</template>
