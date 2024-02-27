<script setup>
import { Loading } from 'quasar'
import { defineProps, ref, onMounted } from 'vue'
import notify from 'src/composables/notify';
import userAPI from "src/services/fetches/users.js";
const emit = defineEmits(['valuecreated'])
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router';
import Router from 'src/router'
import UserDTO from 'src/dto/UserDTO';
import { useLoginStore } from "src/stores/login.js";
import { useErrorHandling } from 'src/composables/useErrorHandling';
const store = useLoginStore()
const router = Router()
const route = useRoute();
const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling();
const props = defineProps({
  edit: Boolean
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

  Loading.show()
  submitting.value = true;
  const output = props.edit ? await userAPI.update(UserData.value) : await userAPI.store(UserData.value);
  checkResponseErrors(output)
  Loading.hide()
  submitting.value = false
  if (isValid.value) {
    props.edit ? notify.update() : notify.store()
    emit('valuecreated', output)
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

</script>
<template>
  <div>
    <q-form class="q-ma-lg" action="companies" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-6">
          <q-input outlined :readonly="submitting || !store.isAdmin || store.userInfo.id == id" class="q-mr-md"
            v-model="UserData.name" label="Name *" lazy-rules :rules="UserDTO.rules().name" :error="hasError('name')">
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
            :error="hasError('email')">
            <template v-slot:error>
              <span :key="index" v-for="(title, index) in errors.email">
                {{ title }}
              </span>
            </template></q-input>
        </div>
        <div class="col-md-6">
          <q-input outlined :readonly="submitting" class="q-mr-md" type="password" v-model="UserData.password"
            label="Password" lazy-rules :error="hasError('password')">
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
            :error="hasError('role')">
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
