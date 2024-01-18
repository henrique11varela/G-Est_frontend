<template>
  <div class="q-py-md">
    <q-list bordered class="row">

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Nome</q-item-label>
          <q-item-label >{{ studentInfo.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Email institucional</q-item-label>
          <q-item-label>{{ studentInfo.atecEmail }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Email pessoal</q-item-label>
          <q-item-label>{{ studentInfo.personalEmail }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Telefone</q-item-label>
          <q-item-label>{{ studentInfo.phoneNumber }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
defineProps({
  studentInfo: {
    type: Object,
    required: true
  }
})
</script>
