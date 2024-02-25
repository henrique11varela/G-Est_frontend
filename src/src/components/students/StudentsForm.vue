<template>
  <div class="q-py-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="row q-col-gutter-md q-mb-md">
        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.name"
          label="Nome"
          lazy-rules="ondemand"
          :rules="rules.name"
          class="col-12 col-lg-8 col-md-6"
        />

        <q-select
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.hardSkills"
          :options="skillValues"
          label="Hard skills"
          lazy-rules="ondemand"
          :rules="rules.skills('hard')"
          class="col-12 col-sm"
        />

        <q-select
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.softSkills"
          :options="skillValues"
          label="Soft skills"
          lazy-rules="ondemand"
          :rules="rules.skills('soft')"
          class="col-12 col-sm"
        />
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.address"
          label="Morada"
          lazy-rules="ondemand"
          :rules="rules.address"
          class="col-12 col-lg-8 col-md-6"
        />

        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.postalCode"
          label="Código Postal"
          mask="####-###"
          lazy-rules="ondemand"
          :rules="rules.postalCode"
          class="col-12 col-sm"
        />
        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.locality"
          label="Localidade"
          lazy-rules="ondemand"
          :rules="rules.locality"
          class="col-12 col-sm"
        />
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.atecEmail"
          label="Email institucional"
          lazy-rules="ondemand"
          :rules="rules.email"
          class="col-12 col-md col-sm-6"
        />

        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.personalEmail"
          label="Email pessoal"
          lazy-rules="ondemand"
          :rules="rules.email"
          class="col-12 col-md col-sm-6"
        />

        <q-input
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.phoneNumber"
          label="Telefone"
          lazy-rules="ondemand"
          :rules="rules.phoneNumber"
          class="col-12 col-sm"
        />
      </div>

      <div class="col-12" v-if="loginStore.isAdmin">
        <q-btn unelevated label="Guardar" type="submit" color="primary"/>
        <q-btn unelevated label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import studentDTO from 'src/dto/StudentDTO'
import studentsAPI from 'src/services/fetches/students'
import { useRoute } from "vue-router"
import { ref, onMounted, watch } from 'vue'
import { useLoginStore } from 'src/stores/login'
import { Loading } from 'quasar'
const loginStore = useLoginStore()

const props = defineProps({
  edit: Boolean,
})

const data = ref(defaultValues())
const defaults = defaultValues()
const skillValues = ['Muito Fraco', 'Fraco', 'Razoável', 'Bom', 'Muito Bom']
const rules = studentDTO.rules()
const route = useRoute()

watch(
  () => route.params.id,
  async newId => getStudent(newId)
)

onMounted(async () => {
  try {
    if (props.edit) {
      Loading.show()
      await getStudent(route.params.id)
      Loading.hide()
    }
  } catch (error) {
    console.error(error)
  }
})

async function getStudent(id) {
  const output = await studentsAPI.show(id)
  data.value.name = defaults.name = output.name
  data.value.personalEmail = defaults.personalEmail = output.personalEmail
  data.value.atecEmail = defaults.atecEmail = output.atecEmail
  data.value.phoneNumber = defaults.phoneNumber = output.phoneNumber
  data.value.address = defaults.address = output.address
  data.value.postalCode = defaults.postalCode = output.postalCode
  data.value.locality = defaults.locality = output.locality
  data.value.hardSkills = defaults.hardSkills = output.hardSkills
  data.value.softSkills = defaults.softSkills = output.softSkills
  data.value.id = output.id
}

function defaultValues() {
  return {
    name: "",
    personalEmail: "",
    atecEmail: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    locality: "",
    hardSkills: "",
    softSkills: ""
  }
}

function onReset() {
  data.value.name = defaults.name
  data.value.personalEmail = defaults.personalEmail
  data.value.atecEmail = defaults.atecEmail
  data.value.phoneNumber = defaults.phoneNumber
  data.value.address = defaults.address
  data.value.postalCode = defaults.postalCode
  data.value.locality = defaults.locality
  data.value.hardSkills = defaults.hardSkills
  data.value.softSkills = defaults.softSkills
}

const emit = defineEmits(['valuecreated'])

async function onSubmit() {
  Loading.show()

  const output = props.edit ?
  await studentsAPI.update(data.value) :
  await studentsAPI.store(data.value)

  Loading.hide()
  emit('valuecreated', output)
}
</script>
