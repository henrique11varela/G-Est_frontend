<script setup>
import { defineProps, ref, defineEmits, reactive, onMounted } from 'vue'
import { matEdit, matDelete } from '@quasar/extras/material-icons'
import userAPI from "src/services/fetches/users.js";
const emit = defineEmits(['submit-Company'])
import { useQuasar } from 'quasar'
import Router from 'src/router'

const router = Router()
const props = defineProps({
  user: null,
  edit: Boolean
})
const $q = useQuasar()
const reactiveEdit = ref(true)
const options = [
  'admin',
  'user'
]
const UserData = ref({
  id: '',
  name: '',
  email: '',
  password: '',
  role: ''
})
function onSubmit() {
  emit('submit-user', UserData.value)
}

function editButton() {
  reactiveEdit.value = !reactiveEdit.value;
}
onMounted(() => {
  if (props.user) {
    UserData.value = props.user
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
    await userAPI.destroy(User.value.id)
    await router.push({ path: 'companies' });
    await router.go();

  })
}
</script>
<template>
  <q-page padding>
    <!-- content -->
    <div v-if="UserData.id">
      <q-btn v-if="reactiveEdit" @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <q-form action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="UserData.name" label="Name *" hint="Name" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-input class="q-ma-md" filled v-model="UserData.email" label="Email*" hint="Name and surname" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-input class="q-ma-md" type="password" filled v-model="UserData.password" label="Password" hint="Name and surname" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" :readonly="!reactiveEdit"></q-input>
        </div>
        <div class="col-md-4">
          <q-select v-model="UserData.role" :options="options" label="Rule" />
        </div>
        <div class="col-md-4">
          <q-btn class="q-ma-md "  style="width: 70%" label="Submit" type="submit" color="primary" v-if="reactiveEdit" />
        </div>
      </div>
    </q-form>



  </q-page>
</template>
