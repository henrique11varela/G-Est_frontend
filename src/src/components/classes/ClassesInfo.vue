<template>
  <div class="q-py-md">
    <q-list bordered class="row">
      <q-item class="col-12 col-sm-3">
        <q-item-section>
          <q-item-label overline>Turma</q-item-label>
          <q-item-label >{{ classInfo?.name }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-12 col-sm-6">
        <q-item-section>
          <q-item-label overline>Curso</q-item-label>
          <q-item-label>{{ `${classInfo?.course?.name} - ${classInfo?.course?.type}` }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-12 col-sm-3">
        <q-item-section>
          <q-item-label overline>Coordenador</q-item-label>
          <q-item-label>{{ classInfo?.coordinator }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
defineProps({
  classInfo: {
    type: Object,
    required: true
  }
})
</script>
