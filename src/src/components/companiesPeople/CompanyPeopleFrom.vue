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
import notify from 'src/composables/notify';
const router = Router()
const route = useRoute();
const props = defineProps({
  edit: Boolean
})
const submitting = ref(false)
const errors = ref({

})
const personData = ref({
})
const $q = useQuasar()
async function onSubmit() {
  submitting.value = true
  let data = {};
  if (!props.edit) {
    data = await companyPeopleAPI.store(personData.value)
  }
  else {
    data = await companyPeopleAPI.update(personData.value)
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
    errors.value.email = data.errors.email
    errors.value.phoneNumber = data.errors.phoneNumber
    return
  }
}

onMounted(async () => {
  personData.value = companyPearsonDTO.input({});
  if (props.edit) {
    Loading.show();
    personData.value = await companyPeopleAPI.show(route.params.personId);
    Loading.hide();
  }
})

function showDeleteModal() {
  $q.dialog({
    title: 'Apagar',
    message: 'Deseija eleminar o contacto da empresa?',
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
  <div v-if="edit">
    <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
  </div>
  <q-form action="companies" @submit.prevent="onSubmit">

    <div class="row">
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="personData.name" label="Name *" hint="Name" lazy-rules
          :rules="companyPearsonDTO.rules().name" :error="errors?.hasOwnProperty('name')" :disable="submitting">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.name">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="personData.email" label="Email*" hint="Email" lazy-rules
          :rules="companyPearsonDTO.rules().email" :error="errors?.hasOwnProperty('email')"  :disable="submitting">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.email">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>
      <div class="col-md-4">
        <q-input outlined class="q-ma-md" filled v-model="personData.phoneNumber" label="Phone *" hint="Phone" lazy-rules
          :rules="companyPearsonDTO.rules().phoneNumber" :error="errors?.hasOwnProperty('phoneNumber')"  :disable="submitting">
          <template v-slot:error>
            <span :key="index" v-for="(title, index) in errors.phoneNumber">
              {{ title }}
            </span>
          </template>
        </q-input>
      </div>

      <div class="col-md-12">
        <div>
          <q-checkbox v-model="personData.isTutor" label="Tutor"  :disable="submitting"/>
        </div>
        <div>
          <q-checkbox v-model="personData.isContact" label="Contact" :disable="submitting" />
        </div>
      </div>
      <q-btn class="q-ma-md " style="width: 100%" label="Submit" type="submit" color="primary"  :disable="submitting"/>
    </div>
  </q-form>
</template>
