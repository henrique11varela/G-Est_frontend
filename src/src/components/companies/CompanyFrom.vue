<script setup>
import { defineProps, ref, defineEmits, reactive, onMounted } from 'vue'

import { CompanyDTO } from "src/dto/CompanyDTO.js"
const emit = defineEmits(['submit-Company'])
const props = defineProps({
  Company: Object
})
const CompanyData = ref({...props.Company})
function onSubmit() {
  emit('submit-Company', CompanyData.value)
}
onMounted(async () => {

  CompanyData.value = props.Company
})
</script>
<template>
  <q-page padding>
    <!-- content -->
    <q-form @submit.prevent="onSubmit">

      <q-input filled v-model="CompanyData.name" label="Name *" hint="Name" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>
      <q-input filled v-model="CompanyData.nipc" label="NIPC*" hint="Name and surname" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>
      <q-input filled v-model="CompanyData.niss" label="NISS *" hint="Name and surname" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>
      <q-input filled v-model="CompanyData.address" label="Address *" hint="Name and surname" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>
      <q-input filled v-model="CompanyData.postcode" label="Postal Code *" hint="Name and surname" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']"></q-input>
      <q-btn label="Submit" type="submit" color="primary" />
    </q-form>



  </q-page>
</template>
