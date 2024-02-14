<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { Loading } from 'quasar';
import { matEdit, matDelete } from '@quasar/extras/material-icons'
import userAPI from "src/services/fetches/users.js";
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router';
import Router from 'src/router'
import UserDTO from 'src/dto/UserDTO';
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

onMounted(async () => {
  UserData.value = UserDTO.input({});
  if (props.edit) {
    Loading.show();
    UserData.value = await userAPI.show(route.params.id);
    Loading.hide();
  }
})


function showDeleteModal() {
  $q.dialog({
    title: 'Alert',
    message: 'Deseija eleminar o Utilizador?',
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
    <!-- content -->
    <div v-if="edit">
      <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
    </div>
    <q-form action="companies" @submit.prevent="onSubmit">

      <div class="row">
        <div class="col-md-4">
          <q-input outlined="" :readonly="submitting" class="q-ma-md" filled v-model="UserData.name" label="Name *"
            hint="Name" lazy-rules :rules="UserDTO.rules().name" :error="errors?.hasOwnProperty('name')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.name">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined="" :readonly="submitting" class="q-ma-md" filled v-model="UserData.email" label="Email*"
            hint="Name and surname" lazy-rules :rules="UserDTO.rules().email" :error="errors?.hasOwnProperty('email')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.email">
                {{ title }}
              </span>
            </template></q-input>
        </div>
        <div class="col-md-4">
          <q-input outlined="" :readonly="submitting" class="q-ma-md" type="password" filled v-model="UserData.password"
            label="Password" hint="Name and surname" lazy-rules :rules="UserDTO.rules().password"
            :error="errors?.hasOwnProperty('password')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.password">
                {{ title }}
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-md-4">
          <q-select :readonly="submitting" v-model="UserData.role" :options="options" label="Rule"
            :rules="UserDTO.rules().role" :error="errors?.hasOwnProperty('role')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.role">
                {{ title }}
              </span>
            </template>
          </q-select>
        </div>
        <div class="col-md-4">
          <q-btn class="q-ma-md " style="width: 70%" label="Submit" type="submit" color="primary" v-if="reactiveEdit" />
        </div>
      </div>
    </q-form>
  </div>
</template>
