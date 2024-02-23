<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { Loading } from 'quasar';
import notify from 'src/composables/notify';
import { matEdit, matDelete } from '@quasar/extras/material-icons'
import userAPI from "src/services/fetches/users.js";
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router';
import Router from 'src/router'
import UserDTO from 'src/dto/UserDTO';
import { useLoginStore } from "src/stores/login.js";
const store = useLoginStore()
const router = Router()
const route = useRoute();
const props = defineProps({
  edit: Boolean
})

const errors = ref({

})
const UserData = ref({})
const submitting = ref(false)
const $q = useQuasar()
const reactiveEdit = ref(true)
const options = [
  'admin',
  'user'
]
async function onSubmit() {

  submitting.value = true
  let data = {};
  if (!props.edit) {
    data = await userAPI.store(UserData.value)
  }
  else {
    data = await userAPI.update(UserData.value)
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
    errors.value.password = data.errors.password
    errors.value.role = data.errors.role

    return
  }
}
const id = route.params.id
onMounted(async () => {
  UserData.value = UserDTO.input({});
  if (props.edit) {
    Loading.show();
    UserData.value = await userAPI.show(id);
    Loading.hide();
  }
})


function showDeleteModal() {
  $q.dialog({
    title: 'Alert',
    message: 'Deseja eliminar o utilizador?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await userAPI.destroy(UserData.value.id)
    await router.push({ path: 'users' });
    await router.go();

  })
}
</script>
<template>
  <div>
    <div class="q-ma-lg" v-if="edit">
      <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <q-form class="q-ma-lg" action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-6">
          <q-input outlined :readonly="submitting || !store.isAdmin || store.userInfo.id == id" class="q-mr-md"
            v-model="UserData.name" label="Name *" lazy-rules :rules="UserDTO.rules().name"
            :error="errors?.hasOwnProperty('name')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-6">
          <q-input outlined :readonly="submitting || !store.isAdmin || store.userInfo.id == id" class="q-ml-md"
            v-model="UserData.email" label="Email*" lazy-rules :rules="UserDTO.rules().email"
            :error="errors?.hasOwnProperty('email')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.email">
                {{ title }}
              </span>
            </template></q-input>
        </div>
        <div class="col-md-6">
          <q-input outlined :readonly="submitting" class="q-mr-md" type="password" v-model="UserData.password"
            label="Password" lazy-rules :error="errors?.hasOwnProperty('password')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.password">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-6">
          <q-select outlined class="q-ml-md" :readonly="submitting || !store.isAdmin || store.userInfo.id == id"
            v-model="UserData.role" :options="options" label="Rule" :rules="UserDTO.rules().role"
            :error="errors?.hasOwnProperty('role')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.role">
                {{ title }}
              </span>
            </template>
          </q-select>
        </div>
        <div class="col-md-12">
          <q-btn class="" style="width: 100%" label="Submit" type="submit" color="primary" v-if="reactiveEdit" />
        </div>
      </div>
    </q-form>
  </div>
</template>
