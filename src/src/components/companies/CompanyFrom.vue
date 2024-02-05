<script setup>
import { defineProps, ref, defineEmits, reactive, onMounted } from 'vue'
import { matEdit, matDelete } from '@quasar/extras/material-icons'
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import CompanyDTO from "src/dto/CompanyDTO"
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import Router from 'src/router'
import CompanyAPI from "src/services/fetches/companies.js";

const router = Router()
const props = defineProps({
  company: null,
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
async function onSubmit() {
  const data = {};
  if (!props.edit) {
    data = await CompanyAPI.store(CompanyData.value)
  }
  else {
    data = await CompanyAPI.update(CompanyData.value)
  }
  emit('valuecreated', data)
}

function editButton() {
  reactiveEdit.value = !reactiveEdit.value;
}
onMounted(() => {
  if (!props.company) {
    CompanyData.value = props.company
  }
  reactiveEdit.value = props.edit
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseija eleminar a empresa?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await CompanyAPI.destroy(CompanyData.value.id)
    await router.push({ path: 'companies' });
    await router.go();

  })
}
</script>
<template>
    <!-- content -->
    <div v-if="CompanyData.id">
      <q-btn v-if="reactiveEdit" @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <q-form action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.name" label="Name *" hint="Name" lazy-rules
            :rules="CompanyDTO.rules().name" ></q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.nipc" label="NIPC*" hint="NIPC" lazy-rules
            :rules="CompanyDTO.rules().nipc" ></q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.niss" label="NISS *" hint="NISS" lazy-rules
            :rules="CompanyDTO.rules().niss" ></q-input>
        </div>
        <div class="col-md-4">
          <q-btn class="q-ma-md " style="width: 70%" label="Submit" type="submit" color="primary"/>
        </div>
      </div>
    </q-form>



</template>
