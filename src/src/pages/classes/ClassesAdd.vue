<template>
  <q-page padding>
    <!-- content -->
    <h1>Criar turma</h1>
    <ClassesForm @class-submit="createClass"></ClassesForm>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import { post } from 'src/services/fetches/studentcollections';

async function createClass(studentClass) {
  const response = await post(studentClass)
}

</script>
