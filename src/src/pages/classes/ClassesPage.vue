<template>
  <q-page padding>
    <!-- content -->
    <h1>Turmas</h1>
    <div class="row">
      <ClassesList @classSelected="selected => selectedClass = selected"></ClassesList>
      <StudentsList :selected-class="selectedClass" class="col-grow"></StudentsList>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import ClassesList from '../../components/classes/ClassesList.vue'
import StudentsList from '../../components/classes/StudentsList.vue'

const selectedClass = ref({})
</script>
