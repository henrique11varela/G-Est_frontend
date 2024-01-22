<script setup>
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
import companyPeopleAPI from "src/services/fetches/companyPeople.js";

import CompanyPeopleDTO from "src/dto/CompanyPeopleDTO.js"
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const router = Router();
const route = useRoute();
const id = route.params.personId;
const edit = ref(false);
async function EditCompanyPerson(obj) {
  try {
    await companyPeopleAPI.update(CompanyPeopleDTO.output(obj));
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    await router.push({
      path: "companies"
    });
    await router.go();
  } catch (e) {
    console.log(e)
  }
}
const companyPerson = ref(false)
onMounted(async () => {
  try {
    companyPerson.value = await companyPeopleAPI.show(id);
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})

</script>
<template>
  <q-page>
    <CompanyPeopleFrom v-if="companyPerson" @submit-person="EditCompanyPerson" :person="companyPerson" :edit="edit"  />
  </q-page>
</template>
