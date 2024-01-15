<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="$emit('classSubmit', {name, course, startDate})"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="name"
        label="Turma"
        lazy-rules
        :rules="rules.name"
      />

      <q-select
        outlined
        v-model="course"
        :options="courses"
        label="Curso"
        lazy-rules
        :rules="rules.course"
        :option-label="(course) => course.name"
        :display-value="course ? course.name : 'Escolha o curso'"
        :loading="loading"
      />

      <q-date
        v-model="startDate"
        minimal
        lazy-rules
        :rules="rules.startDate"
      />

      <div>Name: {{ name }}</div>
      <div>Course: {{ course }}</div>
      <div>Start Date: {{ startDate }}</div>

      <div>
        <q-btn label="Criar" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { rules } from '../../dto/ClassDTO'
import { ref, onMounted } from 'vue'
import { get } from '../../services/fetches/courses'

const name = ref()
const course = ref()
const startDate = ref()
const courses = ref()
const loading = ref(false)

const props = defineProps({
  defaultName: {
    type: String,
    default: ""
  },
  defaultCourse: {
    type: Object,
    default: null
  },
  defaultStartDate: {
    type: String,
    default: ""
  },
})

onMounted(async () => {
  try {
    setDefaults()
    loading.value = true
    courses.value = await get()
    loading.value = false
  } catch (error) {
    console.error(error)
  }
})


function onReset() {
  setDefaults()
}

function setDefaults() {
  name.value = props.defaultName
  course.value = props.defaultCourse
  startDate.value = props.defaultStartDate
}
</script>
