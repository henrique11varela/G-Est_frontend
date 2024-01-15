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
        :rules="classDTO.rules.name"
      />

      <q-select
        outlined
        v-model="course"
        :options="courses"
        label="Curso"
        lazy-rules
        :rules="classDTO.rules.course"
        :option-label="(course) => course.name"
        :display-value="course ? course.name : 'Escolha o curso'"
        :loading="loading"
      />

      <q-date
        v-model="startDate"
        minimal
        lazy-rules
        :rules="classDTO.rules.startDate"
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
import classDTO from '../../dto/ClassDTO'
import { ref, onMounted } from 'vue'
import coursesAPI from '../../services/fetches/courses'

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

const name = ref("")
const course = ref(null)
const startDate = ref("")
const courses = ref(null)
const loading = ref(false)


onMounted(async () => {
  try {
    loading.value = true
    courses.value = await coursesAPI.index()
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
