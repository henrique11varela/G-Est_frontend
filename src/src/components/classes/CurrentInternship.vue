<template>
  <q-td :props="props.tableData">
    <div :key="index" v-for="(internship, index) in props.tableData.row.internships">
      {{ console.log(internship) }}
      <div>{{ internship.id }}</div>
    </div>
  </q-td>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  tableData: Object
})

const currentInternship = ref(null)

onMounted(() => setCurrentInternship())

function setCurrentInternship() {
  for (const internhip of props.tableData.row.internships) {
    console.log(internhip)
  }
}

</script>
