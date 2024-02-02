<template>
  <div>
    <q-list :bordered="bordered" class="row">
      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Email institucional</q-item-label>
          <q-item-label >{{ props.contacts.atecEmail }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Email pessoal</q-item-label>
          <q-item-label >{{ props.contacts.personalEmail }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Telefone</q-item-label>
          <q-item-label>{{ props.contacts.phoneNumber }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-12 col-sm-auto">
        <q-item-section>
          <q-item-label overline>Morada</q-item-label>
          <q-item-label>{{ props.contacts.address }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
const props = defineProps({
  contacts: {
    type: Object,
    required: true
  },
  bordered: Boolean
})
</script>
