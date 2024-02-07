<script setup>
import { defineProps, ref, defineEmits, onMounted } from 'vue'
import { Loading, QSpinnerGears } from 'quasar';
import { matEdit, matDelete } from '@quasar/extras/material-icons'
import { useRoute } from 'vue-router';
import Router from 'src/router';
import companyAddressAPI from "src/services/fetches/companyaddress.js";
import { useQuasar } from 'quasar'
import companyAddressesDTO from "src/dto/CompanyAddressDTO.js"
import notify from 'src/composables/notify';
import CompanyAddressDTO from 'src/dto/CompanyAddressDTO.js';
const emit = defineEmits(['valuecreated'])

const route = useRoute();
const router = Router()
const props = defineProps({
  edit: Boolean
})
const errors = ref({

})
const $q = useQuasar()
const addressData = ref({
})
async function onSubmit() {
  Loading.show();
  let data = {};
  if (!props.edit) {
    data = await companyAddressAPI.store(addressData.value)
  }
  else {
    data = await companyAddressAPI.update(addressData.value)
  }
  Loading.hide();
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
    errors.value.description = data.errors.description
    errors.value.address = data.errors.address
    errors.value.postalCode = data.errors.postal_code
    return
  }
}

onMounted(async () => {
  addressData.value = CompanyAddressDTO.input({});
  if (props.edit) {
    Loading.show();
    addressData.value = await companyAddressAPI.show(route.params.addressId);
    Loading.hide();
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseija eleminar a morada da empresa?',
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
  <div v-if="edit">
    <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
  </div>
  <q-form action="companies" @submit.prevent="onSubmit">

    <div class="row">
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="addressData.description" label="Description *"
          hint="Description" lazy-rules :rules="companyAddressesDTO.rules().description"
          :error="errors?.hasOwnProperty('description')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.description">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="addressData.address" label="Address*" hint="Name and surname"
          lazy-rules :rules="companyAddressesDTO.rules().address" :error="errors?.hasOwnProperty('address')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.address">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="addressData.postalCode" label="Postal code *"
          hint="Name and surname" lazy-rules :rules="companyAddressesDTO.rules().postalCode"
          :error="errors?.hasOwnProperty('postalCode')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.postalCode">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-12">
        <div>
          <q-checkbox v-model="addressData.hq" label="Sede" />
        </div>
      </div>
      <q-btn class="q-ma-md " style="width: 100%" label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>
