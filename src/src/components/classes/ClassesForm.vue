<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
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
        :display-value="course ? course.name : 'Escolha o curso'"
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

const name = ref()
const course = ref()
const startDate = ref()

defineProps({
  classProp: {
    type: Object,
    default: {
      id: null,
      name: "",
      course: null,
      startDate: ""
    }
  }
})


let isCreate = true
onMounted(() => {
  if (classProp.id) isCreate = false
  name.value = classProp.name
  course.value = classProp.course
  startDate.value = classProp.startDate

  //Implement course fetch and possibly other stuff
  //...
})

function onSubmit(){

}

function onReset() {
  name.value = classProp.name
  course.value = classProp.course
  startDate.value = classProp.startDate
}

const courses = [
  {id: 1, name: 'TPSI'},
  {id: 2, name: 'GRSIP'},
  {id: 3, name: 'MPCP'},
  {id: 4, name: 'CIBER'},
  {id: 5, name: 'GCE'},
]
</script>
