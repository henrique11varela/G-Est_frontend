<script setup>
import { defineProps, ref, defineEmits } from 'vue'

const emit = defineEmits(['submit-Company'])
const props = defineProps({
  name: String,
  email: String,
})
const user = ref({
  name: props.name,
  email: props.address,
  password: '',
})

function onSubmit() {
  emit('submit-Company', user.value)
}

</script>
<template>
  <q-page padding>
    <!-- content -->
    <h1>Adicionae Companhias</h1>
    <q-form @submit="onSubmit">

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
