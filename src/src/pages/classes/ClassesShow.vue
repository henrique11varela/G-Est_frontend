<template>
  <q-page padding>
    <ClassesInfo :class-info="classInfo"></ClassesInfo>
    <StudentsList :students="students"></StudentsList>
  </q-page>
</template>

<script setup>
import StudentsList from 'src/components/classes/StudentsList.vue'
import ClassesInfo from 'src/components/classes/ClassesInfo.vue'
import classesAPI from 'src/services/fetches/classes'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const classInfo = ref({})
const students = ref([])
const route = useRoute()

watch(
  () => route.params.id,
  newId => getClass(newId)
)

onMounted(() => {
  getClass(route.params.id)
})

async function getClass(id) {
    const response = await classesAPI.show(id);
    console.log(response)
    const { name, course, startDate } = response
    classInfo.value = { name, course: course.name, startDate}
    students.value = response.students
    console.log(classInfo.value)
    console.log(students.value)
}
</script>
