<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row items-center q-gutter-md no-wrap">
        <div>
          <h1 class="text-h6">Turmas</h1>
        </div>
        <q-btn dense unelevated color="primary" icon="add" :to="'classes/add'" />
      </div>
      <ClassesList></ClassesList>
    </div>
  </q-page>
</template>

<script setup>
import ClassesList from 'src/components/classes/ClassesList.vue'
</script>
