<script setup>
import { defineProps, ref, defineEmits, onMounted } from 'vue'
import { matEdit, matDelete } from '@quasar/extras/material-icons'
const emit = defineEmits(['submit-person'])
import { useQuasar } from 'quasar'
import Router from 'src/router'
import companyPearsonDTO from "src/dto/CompanyPeopleDTO"

import companyPeopleAPI from "src/services/fetches/companyPeople.js";
const router = Router()
const props = defineProps({
  person: null,
})
const $q = useQuasar()
const personData = ref({
  id: '',
  name: '',
  phoneNumber: '',
  email: '',
  isTutor: null,
  isContact: null,
})
async function onSubmit() {
  const data = {};
  if (!props.edit) {
    data = await companyPeopleAPI.store(personData.value)
  }
  else {
    data = await companyPeopleAPI.update(personData.value)
  }
  emit('valuecreated', data)
}

onMounted(() => {
  if (props.person) {
    personData.value = props.person
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseija eleminar o contacto da empresa?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await companyPeopleAPI.destroy(personData.value.id)
    await router.push({ path: 'companies' });
    await router.go();

  })
}
</script>
<template>
  <!-- content -->
  <div v-if="personData.id">
    <q-btn  @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
  </div>
  <q-form action="companies" @submit.prevent="onSubmit">

    <div class="row">
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="personData.name" label="Name *" hint="Name" lazy-rules
          :rules="companyPearsonDTO.rules().name"></q-input>
      </div>
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="personData.email" label="NIPC*" hint="Name and surname" lazy-rules
          :rules="companyPearsonDTO.rules().email"></q-input>
      </div>
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="personData.phoneNumber" label="NISS *" hint="Name and surname" lazy-rules
          :rules="companyPearsonDTO.rules().phoneNumber"></q-input>
      </div>

      <div class="col-md-12">
        <div>
          <q-checkbox v-model="personData.isTutor" label="Tutor" />
        </div>
        <div>
          <q-checkbox v-model="personData.isContact" label="Contact" />
        </div>
      </div>
      <q-btn class="q-ma-md " style="width: 100%" label="Submit" type="submit" color="primary"  />
    </div>
  </q-form>
</template>
