<template>
  <q-td>
    <div :key="index" v-for="(internship, index) in props.internships">
      {{ console.log(internship) }}
      <div>{{ internship.id }}</div>
    </div>
  </q-td>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  internships: Object
})

const currentInternship = ref({ company: "", status: "", date: "" })

// onMounted(() => compareInternships())

function setCurrentInternship() {
  for (const internship of props.tableData.row.internships) {
    for (const company of internship.companies) {
      if (company.pivot.status === 'Em Colocação') {
        currentInternship.value.company = company.name
        currentInternship.value.status = company.pivot.status
        break
      }
    }
  }
}

</script>
