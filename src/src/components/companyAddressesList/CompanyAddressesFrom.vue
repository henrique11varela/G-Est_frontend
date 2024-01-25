<script setup>
import { defineProps, ref, defineEmits, onMounted } from 'vue'
import { matEdit, matDelete } from '@quasar/extras/material-icons'

import { useQuasar } from 'quasar'
import Router from 'src/router'
import companyAddressesDTO from "src/dto/CompanyAddressDTO.js"

import companyAddressAPI from "src/services/fetches/companyaddress.js";
const emit = defineEmits(['valuecreated'])
const router = Router()
const props = defineProps({
  address: null,
})
const $q = useQuasar()
const addressData = ref({
  id: '',
  description: '',
  address: '',
  postalCode: '',
})
async function onSubmit() {
  const data = {};
  if (props.edit) {
    data = await companyAddressAPI.store(addressData.value)
  }
  else {
    data = await companyAddressAPI.update(addressData.value)
  }
  emit('valuecreated', data)
}

onMounted(() => {
  if (props.address) {
    addressData.value = props.address
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Alert',
    message: 'Some message',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await companyAddressAPI.destroy(addressData.value.id)
    await router.push({ path: 'companies' });
    await router.go();

  })
}
</script>
<template>
  <!-- content -->
  <div v-if="addressData.id">
    <q-btn  @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
  </div>
  <q-form action="companies" @submit.prevent="onSubmit">

    <div class="row">
      <div class="col-md-4">
        <q-input class="q-ma-md" filled v-model="addressData.description" label="Description *" hint="Description" lazy-rules
          :rules="companyAddressesDTO.rules().description"></q-input>
      </div>
      <div class="col-md-4">
        <q-input class="q-ma-md" filled v-model="addressData.address" label="Address*" hint="Name and surname" lazy-rules
          :rules="companyAddressesDTO.rules().address"></q-input>
      </div>
      <div class="col-md-4">
        <q-input class="q-ma-md" filled v-model="addressData.postalCode" label="Postal code *" hint="Name and surname" lazy-rules
          :rules="companyAddressesDTO.rules().postalCode"></q-input>
      </div>

      <q-btn class="q-ma-md " style="width: 100%" label="Submit" type="submit" color="primary"  />
    </div>
  </q-form>
</template>
