<script setup>
import { ref, onMounted } from 'vue'
import { Loading } from 'quasar';
import { matDelete } from '@quasar/extras/material-icons'
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import Router from 'src/router'
import { useRoute } from 'vue-router';
import companyPearsonDTO from "src/dto/CompanyPeopleDTO"
import companyPeopleAPI from "src/services/fetches/companyPeople.js";
import { useErrorHandling } from 'src/composables/useErrorHandling';
import notify from 'src/composables/notify';
const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling();
const router = Router()
const route = useRoute();
const props = defineProps({
  edit: Boolean,
  propid: {
    type: Number,
    required: false,
    default: null
  }
})

// const CompanyId = ref(props.propid ? props.propid : route.params.id)
const submitting = ref(false)
const personData = ref({
})
const $q = useQuasar()
async function onSubmit() {
  Loading.show()
  submitting.value = true;
  const output = props.edit ? await companyPeopleAPI.update(personData.value) : await companyPeopleAPI.store(personData.value);
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
  personData.value = companyPearsonDTO.input({});
  personData.value.companyId = props.propid ? props.propid : route.params.id
  if (props.edit) {
    Loading.show();
    personData.value = await companyPeopleAPI.show(route.params.personId);
    Loading.hide();
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseja eliminar o contacto da empresa?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await companyPeopleAPI.destroy(personData.value.id)
    await router.push({ path: 'companies' });
    await router.go();

  })
}
</script>
<template>
  <!-- content -->
  <q-form class="q-ma-lg" action="companies" @submit.prevent="onSubmit">

    <div v-if="edit">
      <q-btn class="q-mb-md" @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <div class="row">
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-mr-md" v-model="personData.name" label="Name *" lazy-rules
          :rules="companyPearsonDTO.rules().name" :error="hasError('name')" :disable="submitting">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.name">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-ml-md" v-model="personData.email" label="Email*" lazy-rules
          :rules="companyPearsonDTO.rules().email" :error="hasError('email')" :disable="submitting">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.email">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-6">
        <q-input outlined class="q-mb-md q-mr-md" v-model="personData.phoneNumber" label="Phone *" lazy-rules
          :rules="companyPearsonDTO.rules().phoneNumber" :error="hasError('phoneNumber')"
          :disable="submitting">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.phoneNumber">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>

      <div class="col-md-6 q-mb-md ">
        <div class=" q-ml-md">
          <div>
            <q-checkbox v-model="personData.isTutor" label="Tutor" :disable="submitting" />
          </div>
          <div>
            <q-checkbox v-model="personData.isContact" label="Contact" :disable="submitting" />
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <q-btn style="width: 100%" label="Submit" type="submit" color="primary" :disable="submitting" />
      </div>
    </div>
  </q-form>
</template>
