<script setup>
import { defineProps, ref, defineEmits, onMounted } from 'vue'
import { Loading, QSpinnerGears } from 'quasar';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import companyAddressAPI from "src/services/fetches/companyaddress.js";
import { useQuasar } from 'quasar'
import companyAddressesDTO from "src/dto/CompanyAddressDTO.js"
import notify from 'src/composables/notify';
import CompanyAddressDTO from 'src/dto/CompanyAddressDTO.js';
import { useErrorHandling } from 'src/composables/useErrorHandling';
const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling();
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


const addressData = ref({
})
async function onSubmit() {
  Loading.show()
  const output = props.edit ? await companyAddressAPI.update(addressData.value) : await companyAddressAPI.store(addressData.value);
  checkResponseErrors(output)
  Loading.hide()
  if (isValid.value) {
    props.edit ? notify.update() : notify.store()
    emit('valuecreated', output)
    return
  }
}

onMounted(async () => {
  addressData.value = CompanyAddressDTO.input({});
  addressData.value.companyId = CompanyId.value;
  if (props.edit) {
    Loading.show();

    const output = await companyAddressAPI.show(route.params.addressId);
    checkResponseErrors(output)
    addressData.value = output;
    Loading.hide();
  }
})

</script>
<template>
  <q-form action="companies" @submit.prevent="onSubmit">

    <div class="row">
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-mr-md" v-model="addressData.description" label="Descrição" lazy-rules
          :rules="companyAddressesDTO.rules().description"
          :error="hasError('description')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.description">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-ml-md" v-model="addressData.address" label="Morada" lazy-rules
          :rules="companyAddressesDTO.rules().address" :error="hasError('address')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.address">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-mr-md" v-model="addressData.postalCode" label="Codigo Postal*" lazy-rules
          :rules="companyAddressesDTO.rules().postalCode"
          mask="####-###"
          :error="hasError('postalCode')">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.postalCode">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-ml-md" v-model="addressData.locality" label="Localidade" lazy-rules
          :rules="companyAddressesDTO.rules().locality"  :error="hasError('locality')">
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
        <q-btn style="width: 100%;" label="Guardar" type="submit" color="primary"  />
      </div>
    </div>
  </q-form>
</template>
