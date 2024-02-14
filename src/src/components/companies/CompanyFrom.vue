<script setup>
import { defineProps, ref, defineEmits, reactive, onMounted } from 'vue'
import { matEdit, matDelete } from '@quasar/extras/material-icons';
import { Loading, QSpinnerGears } from 'quasar';
import { useRoute } from 'vue-router';
import CompanyDTO from "src/dto/CompanyDTO"
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import Router from 'src/router'
import CompanyAPI from "src/services/fetches/companies.js";

import notify from 'src/composables/notify';
const route = useRoute();
const router = Router();
const errors = ref({

})

const props = defineProps({
  edit: Boolean
})
const $q = useQuasar()
const CompanyData = ref({})
const submitting = ref(false)
async function onSubmit() {
  submitting.value = true
  let data = {};
  if (!props.edit) {
    data = await CompanyAPI.store(CompanyData.value)
  }
  else {
    data = await CompanyAPI.update(CompanyData.value)
  }

  submitting.value = false
  if (data.requestStatus == 200) {
    if (!props.edit) {
      notify.store()
    } else {
      notify.update()
    }
    emit('valuecreated', data)
    return
  }
  if (data.requestStatus == 422) {
    errors.value.name = data.errors.name
    errors.value.nipc = data.errors.nipc
    errors.value.niss = data.errors.niss
    errors.value.cae = data.errors.cae
    return
  }
}

onMounted(async () => {
  CompanyData.value = CompanyDTO.input({})
  if (props.edit) {
    Loading.show();
    CompanyData.value = await CompanyAPI.show(route.params.id)
    Loading.hide()
  }
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
  <div>
    <!-- content -->
    <div v-if="props.edit">
      <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <q-form action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.name" label="Name *" hint="Name" lazy-rules
            :rules="CompanyDTO.rules().name" :error="errors?.hasOwnProperty('name')" :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.nipc" label="NIPC*" hint="NIPC" lazy-rules
            :rules="CompanyDTO.rules().nipc" :error="errors?.hasOwnProperty('nipc')" :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.niss" label="NISS *" hint="NISS" lazy-rules
            :rules="CompanyDTO.rules().niss" :error="errors?.hasOwnProperty('niss')" :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined class="q-ma-md" filled v-model="CompanyData.cae" label="CAE *" hint="CAE" lazy-rules
            :rules="CompanyDTO.rules().cae" :error="errors?.hasOwnProperty('cae')" :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-12">
          <q-btn class="q-ma-md " style="width: 70%" label="Submit" type="submit" color="primary" :disable="submitting" />
        </div>
      </div>
    </q-form>
  </div>
</template>
