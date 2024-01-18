<template>
    <div class="q-py-md">
    <q-form style="max-width: 400px;"
      @submit="$emit('studentSubmit', { name, atecEmail, personalEmail, phoneNumber })"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="name"
        label="Nome"
        lazy-rules="ondemand"
        :rules="rules.name"
      />

      <q-input
        outlined
        v-model="atecEmail"
        label="Email institucional"
        lazy-rules="ondemand"
        :rules="rules.email"
      />

      <q-input
        outlined
        v-model="personalEmail"
        label="Email pessoal"
        lazy-rules="ondemand"
        :rules="rules.email"
      />

      <q-input
        outlined
        v-model="phoneNumber"
        label="Telefone"
        lazy-rules="ondemand"
        :rules="rules.phoneNumber"
      />

      <div class="col-12" v-if="false">
        <div>Name: {{ name }}</div>
        <div>Atec Email: {{ atecEmail }}</div>
        <div>Personal Email: {{ personalEmail }}</div>
        <div>Phone Number: {{ phoneNumber }}</div>
      </div>

      <div class="col-12">
        <q-btn unelevated label="Guardar" type="submit" color="primary"/>
        <q-btn unelevated label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
</template>

<script setup>
import studentDTO from 'src/dto/StudentDTO'
import { ref, onMounted } from 'vue'

const props = defineProps({
  defaultName: {
    type: String,
    default: ""
  },
  defaultAtecEmail: {
    type: String,
    default: ""
  },
  defaultPersonalEmail: {
    type: String,
    default: ""
  },
  defaultPhoneNumber: {
    type: String,
    default: ""
  },
})

const name = ref("")
const atecEmail = ref("")
const personalEmail = ref("")
const phoneNumber = ref("")
const rules = studentDTO.rules()


onMounted(() => setDefaults())

function onReset() {
  setDefaults()
}

function setDefaults() {
  name.value = props.defaultName
  atecEmail.value = props.defaultAtecEmail
  personalEmail.value = props.defaultPersonalEmail
  phoneNumber.value = props.defaultPhoneNumber
}
</script>
