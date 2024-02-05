<script setup>
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
import companyPeopleAPI from "src/services/fetches/companyPeople.js";

import { Loading, QSpinnerGears } from 'quasar';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const router = Router();
const route = useRoute();
const id = route.params.personId;
const edit = ref(true);

Loading.show()
const companyPerson = ref(false)
onMounted(async () => {
  try {
    companyPerson.value = await companyPeopleAPI.show(id);
    Loading.hide()
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})

</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyPeopleFrom v-if="companyPerson" :person="companyPerson" :edit="edit" />
    </div>
  </q-page>
</template>
