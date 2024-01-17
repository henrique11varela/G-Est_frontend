<template>
  <q-page padding>
    <!-- content -->
    <h1 class="text-h6">Editar turma</h1>
    <ClassesForm @class-submit="editClass"
    :default-name="studentClass.name"
    :default-start-date="studentClass.startDate"
    :default-course="studentClass.course"></ClassesForm>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const studentClass = ref({})
const route = useRoute()

watch(
  () => route.params.id,
  async newId => {
    studentClass.value = await classesAPI.show(newId);
  }
)

onMounted(async () => {
  studentClass.value = await classesAPI.show(route.params.id);
})

async function editClass(editedClass) {
  editedClass.id = studentClass.value.id
  console.log(editedClass)
  const response = await classesAPI.update(editedClass)
  console.log(response)
}

</script>
