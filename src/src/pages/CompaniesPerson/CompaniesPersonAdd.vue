<script setup>
import CompanyPeopleFrom from 'src/components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
import companiesPeopleAPI from "src/services/fetches/companyPeople.js";
import CompanyPeopleDTO from "src/dto/CompanyPeopleDTO.js"
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const person = {
  companyId: id
}
async function addCompany(obj) {
  try {
    await companiesPeopleAPI.store(CompanyPeopleDTO.output(obj))
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    router.push('companies')
    router.go()
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <q-page>
    <CompanyPeopleFrom :person="person" @submit-person="addCompany"/>
  </q-page>
</template>
