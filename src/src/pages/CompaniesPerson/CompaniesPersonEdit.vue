<script setup>
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
const router = Router();
const valueCreated = async function (data) {

  await router.back()
}

</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyPeopleFrom :edit="true" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
