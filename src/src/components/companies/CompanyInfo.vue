

<script setup>
defineProps({
  company: {
    type: Object
  }
})
</script>

<template>
  <div class="q-py-md">
    <q-list bordered class="row">

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Nome</q-item-label>
          <q-item-label >{{ company.name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>NISS</q-item-label>
          <q-item-label>{{ company.niss }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>NIPC</q-item-label>
          <q-item-label>{{ company.nipc }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
