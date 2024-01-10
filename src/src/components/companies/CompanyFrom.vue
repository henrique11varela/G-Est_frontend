<script setup>
import { defineProps, ref, defineEmits, reactive, onMounted } from 'vue'
import { matEdit, matDelete } from '@quasar/extras/material-icons'
import { deleteCompany } from "src/services/fetches/companies.js";
const emit = defineEmits(['submit-Company'])
import { useQuasar } from 'quasar'
import Router from 'src/router'

const router = Router()
const props = defineProps({
  Company: null,
  edit: Boolean
})
const $q = useQuasar()
const reactiveEdit = ref(true)
const CompanyData = ref({
  id: '',
  name: '',
  address: '',
  postCode: '',
  niss: '',
  nipc: '',
})
function onSubmit() {
  emit('submit-Company', CompanyData.value)
}

function editButton() {
  reactiveEdit.value = !reactiveEdit.value;
}
onMounted(() => {
  if (props.Company) {
    CompanyData.value = props.Company
  }
  reactiveEdit.value = props.edit
})

function showDeleteModal() {
  $q.dialog({
    title: 'Alert',
    message: 'Some message',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await deleteCompany(CompanyData.value.id)
    await router.push({ path: 'companies' });
    await router.go();

  })
}
</script>
<template>
  <q-page padding>
    <!-- content -->
    <div v-if="CompanyData.id">
      <q-btn @click="editButton" :icon="matEdit" label="Edit" />

      <q-btn v-if="reactiveEdit" @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <q-form action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="CompanyData.name" label="Name *" hint="Name" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="CompanyData.nipc" label="NIPC*" hint="Name and surname" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="CompanyData.niss" label="NISS *" hint="Name and surname" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="CompanyData.address" label="Address *" hint="Name and surname"
            lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']"
            :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="CompanyData.postcode" label="Postal Code *" hint="Name and surname"
            lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']"
            :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-btn class="q-ma-md " style="width: 70%" label="Submit" type="submit" color="primary" v-if="reactiveEdit" />
        </div>
      </div>
    </q-form>



  </q-page>
</template>
