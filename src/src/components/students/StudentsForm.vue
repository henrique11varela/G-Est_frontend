<template>
  <div class="q-py-md">
    <q-spinner
      color="primary"
      size="3em"
      :thickness="2"
      v-if="loading"
    />
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      v-else
    >
      <div class="row q-col-gutter-md q-mb-md">
        <q-input
          :readonly="submitting"
          outlined
          v-model="data.name"
          label="Nome"
          lazy-rules="ondemand"
          :rules="rules.name"
          class="col-12 col-lg-8 col-md-6"
        />

        <q-select
          :readonly="submitting"
          outlined
          v-model="data.hardSkills"
          :options="skillValues"
          label="Hard skills"
          lazy-rules="ondemand"
          :rules="rules.skills('hard')"
          class="col-12 col-sm"
        />

        <q-select
          :readonly="submitting"
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
          :readonly="submitting"
          outlined
          v-model="data.address"
          label="Morada"
          lazy-rules="ondemand"
          :rules="rules.address"
          class="col-12 col-lg-8 col-md-6"
        />

        <q-input
          :readonly="submitting"
          outlined
          v-model="data.postalCode"
          label="Código Postal"
          mask="####-###"
          lazy-rules="ondemand"
          :rules="rules.postalCode"
          class="col-12 col-sm"
        />
        <q-input
          :readonly="submitting"
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
          :readonly="submitting"
          outlined
          v-model="data.atecEmail"
          label="Email institucional"
          lazy-rules="ondemand"
          :rules="rules.email"
          class="col-12 col-md col-sm-6"
        />

        <q-input
          :readonly="submitting"
          outlined
          v-model="data.personalEmail"
          label="Email pessoal"
          lazy-rules="ondemand"
          :rules="rules.email"
          class="col-12 col-md col-sm-6"
        />

        <q-input
          :readonly="submitting"
          outlined
          v-model="data.phoneNumber"
          label="Telefone"
          lazy-rules="ondemand"
          :rules="rules.phoneNumber"
          class="col-12 col-sm"
        />
      </div>

      <div class="col-12">
        <q-btn unelevated label="Guardar" type="submit" color="primary" :disabled="submitting"/>
        <q-btn unelevated label="Reset" type="reset" color="primary" flat class="q-ml-sm" :disabled="submitting"/>
        <q-spinner color="primary" size="2.5em" :thickness="2" v-if="submitting"/>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import studentDTO from 'src/dto/StudentDTO'
import studentsAPI from 'src/services/fetches/students'
import { useRoute } from "vue-router"
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  edit: Boolean,
})

const data = ref(defaultValues())
const defaults = defaultValues()
const skillValues = ['Muito Fraco', 'Fraco', 'Razoável', 'Bom', 'Muito Bom']
const loading = ref(false)
const submitting = ref(false)
const rules = studentDTO.rules()
const route = useRoute()

watch(
  () => route.params.id,
  async newId => getStudent(newId)
)

onMounted(async () => {
  try {
    if (props.edit) {
      loading.value = true
      await getStudent(route.params.id)
      loading.value = false
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
  submitting.value = true

  const output = props.edit ?
  await studentsAPI.update(data.value) :
  await studentsAPI.store(data.value)

  submitting.value = false
  emit('valuecreated', output)
}
</script>
