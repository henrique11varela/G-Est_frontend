<template>
  <q-page padding>
    <!-- content -->
    <h1 class="text-h6">Criar turma</h1>
    <ClassesForm @class-submit="createClass"></ClassesForm>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import classesAPI from 'src/services/fetches/classes'

async function createClass(studentClass) {
  const response = await classesAPI.store(studentClass)
  console.log(response)
}

</script>
