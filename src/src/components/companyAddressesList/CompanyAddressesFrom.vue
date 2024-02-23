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
  edit: Boolean,
  propid: {
    type: Number,
    required: false,
    default: null
  }
})

const CompanyId = ref(props.propid ? props.propid : route.params.id)



const errors = ref({

})
const $q = useQuasar()
const addressData = ref({
})
async function onSubmit() {
  let data = {};
  if (!props.edit) {
    data = await companyAddressAPI.store(addressData.value)
  }
  else {
    data = await companyAddressAPI.update(addressData.value)
  }
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
  addressData.value.companyId = CompanyId.value;
  if (props.edit) {
    Loading.show();
    addressData.value = await companyAddressAPI.show(route.params.addressId);
    Loading.hide();
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseja eliminar a morada da empresa?',
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
  <q-form class="q-ma-lg" action="companies" @submit.prevent="onSubmit">

    <!-- content -->
    <div v-if="edit">
      <q-btn class="q-mb-md" @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <div class="row">
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-mr-md" v-model="addressData.description" label="Descrição" lazy-rules
          :rules="companyAddressesDTO.rules().description"
          :error="errors?.hasOwnProperty('description')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.description">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-ml-md" v-model="addressData.address" label="Morada" lazy-rules
          :rules="companyAddressesDTO.rules().address" :error="errors?.hasOwnProperty('address')" >
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.address">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-mr-md" v-model="addressData.postalCode" label="Codigo Postal" lazy-rules
          :rules="companyAddressesDTO.rules().postalCode"
          :error="errors?.hasOwnProperty('postalCode')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.postalCode">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-ml-md" v-model="addressData.locality" label="Localidade" lazy-rules
          :rules="companyAddressesDTO.rules().locality"  :error="errors?.hasOwnProperty('locality')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.locality">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-12 q-mb-md ">
        <div>
          <q-checkbox v-model="addressData.hq" label="Sede"  />
        </div>
      </div>
      <div class="col-md-12">
        <q-btn style="width: 100%;" label="Submit" type="submit" color="primary"  />
      </div>
    </div>
  </q-form>
</template>
