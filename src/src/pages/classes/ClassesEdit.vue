<template>
  <q-page padding>
    <!-- content -->
    <h1 class="text-h6">Editar turma</h1>
    <ClassesForm @class-submit="editClass"></ClassesForm>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import { put } from 'src/services/fetches/studentcollections';

async function editClass(studentClass) {
  const response = await put(studentClass)
}

</script>
