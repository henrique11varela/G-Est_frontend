<template>
    <div class="q-pa-md">
    <q-form
      @submit="$emit('classSubmit', {name, course, startDate})"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="name"
        label="Turma"
        lazy-rules="ondemand"
        :rules="rules.name"
      />

      <q-select
        outlined
        v-model="course"
        :options="courses"
        label="Curso"
        lazy-rules="ondemand"
        :rules="rules.course"
        :option-label="course => course.name"
        :display-value="course ? course.name : 'Escolha o curso'"
        :loading="loading"
      />

      <q-input outlined v-model="startDate" mask="date" lazy-rules="ondemand" :rules="rules.startDate">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                v-model="startDate"
                :locale="qDateLocale">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div>Name: {{ name }}</div>
      <div>Course: {{ course }}</div>
      <div>Start Date: {{ startDate }}</div>

      <div>
        <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
</template>

<script setup>
import { qDateLocale } from 'src/config/config'
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
const rules = classDTO.rules()


onMounted(async () => {
  try {
    loading.value = true
    courses.value = await coursesAPI.index()
    console.log(courses.value)
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
