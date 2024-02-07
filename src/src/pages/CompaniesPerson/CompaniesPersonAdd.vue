<script setup>
import CompanyPeopleFrom from 'src/components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'
const router = Router();
const valueCreated = async function (data) {
  if (data.requestStatus == 200) {
    notify.store()
    await router.back()
  }
}

</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyPeopleFrom @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
