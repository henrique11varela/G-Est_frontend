<template>
  <q-list bordered class="row">
    <q-item class="col-12 col-sm">
      <q-item-section>
        <q-item-label overline>Nome</q-item-label>
        <q-item-label >{{ student.name }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item class="col-12 col-sm">
      <q-item-section>
        <q-item-label overline>Email institucional</q-item-label>
        <q-item-label>{{ student.atecEmail }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item class="col-12 col-sm">
      <q-item-section>
        <div>
          <q-btn unelevated label="Associar" color="accent" @click="$emit('studentPicked', student)" v-if="associate"/>
          <q-item-label class="text-negative" v-else>Formando já incluído</q-item-label>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineProps({
  student: {
    type: Object,
    required: true
  },
  associate: {
    type: Boolean,
    required: true
  }
})
</script>
