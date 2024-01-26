<script setup>
import CompanyPeopleFrom from 'src/components/companiesPeople/CompanyPeopleFrom.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const person = {
  companyId: id
}

</script>

<template>
  <q-page>
    <CompanyPeopleFrom :person="person"/>
  </q-page>
</template>
