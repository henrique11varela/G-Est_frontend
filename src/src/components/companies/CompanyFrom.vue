<script setup>
import { defineProps, ref, defineEmits, reactive, onMounted } from 'vue'
import { Loading, QSpinnerGears } from 'quasar';
import { useRoute } from 'vue-router';
import CompanyDTO from "src/dto/CompanyDTO"
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import Router from 'src/router'
import CompanyAPI from "src/services/fetches/companies.js";
import { useErrorHandling } from 'src/composables/useErrorHandling';

const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling();
import notify from 'src/composables/notify';
const route = useRoute();
const router = Router();

const props = defineProps({
  edit: Boolean
})
const $q = useQuasar()
const CompanyData = ref({})
const submitting = ref(false)
async function onSubmit() {
  Loading.show()
  submitting.value = true;
  const output = props.edit ? await CompanyAPI.update(CompanyData.value) : await CompanyAPI.store(CompanyData.value);
  checkResponseErrors(output)
  Loading.hide()
  submitting.value = false
  if (isValid.value) {
    props.edit ? notify.update() : notify.store()
    emit('valuecreated', output)
    return
  }
}

onMounted(async () => {
  CompanyData.value = CompanyDTO.input({})
  if (props.edit) {
    Loading.show();
    const output = await CompanyAPI.show(route.params.id);
    checkResponseErrors(output)
    CompanyData.value = output
    Loading.hide()
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseja eliminar a empresa?',
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
    <q-form action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-6">
          <q-input outlined class="q-mr-md  q-mb-md" v-model="CompanyData.name" label="Name" lazy-rules
            :rules="CompanyDTO.rules().name" :error="hasError('name')" :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-6">
          <q-input outlined class="q-ml-md q-mb-md" v-model="CompanyData.nipc" label="NIPC" lazy-rules
            :rules="CompanyDTO.rules().nipc" :error="hasError('nipc')" mask="####################"
            :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.nipc">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-6">
          <q-input outlined class="q-mr-md q-mb-md" v-model="CompanyData.niss" label="NISS" lazy-rules
            :rules="CompanyDTO.rules().niss" :error="hasError('niss')" mask="####################"
            :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.niss">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-6">
          <q-input outlined class="q-ml-md  q-mb-md" v-model="CompanyData.cae" label="CAE" lazy-rules
            :rules="CompanyDTO.rules().cae" :error="hasError('cae')" :disable="submitting">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.cae">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-12">
          <q-btn style="width: 100%" label="Submit" type="submit" color="primary" :disable="submitting" />
        </div>
      </div>
    </q-form>
  </div>
</template>
