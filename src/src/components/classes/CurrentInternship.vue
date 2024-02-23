<template>
  <q-td>
    <div class="column q-gutter-xs">
      <div :key="index" v-for="(internship, index) in props.internships">
        <router-link :to="`/internships/${internship.id}`" class="link">{{ setInternshipStatus(internship) }}</router-link>
      </div>
    </div>
  </q-td>
</template>

<script setup>
const props = defineProps({
  internships: {
    type: Array,
    required: true,
  }
})

const statusOptions = ['Aceite', 'Em Colocação', 'Opção', 'Não Aceite']

function setInternshipStatus(internship) {
  if (internship.endedInternship) {
    const company = internship.companies.find(c => c.status === statusOptions[0])
    const append = internship.endedInternship.reason
    return `${company?.name} - Terminado (${append})`
  }

  if (internship.startedInternship) {
    const company = internship.companies.find(c => c.status === statusOptions[0])
    const now = new Date()
    const startDate = new Date(internship.startedInternship.startDate)
    const append = startDate <= now ? 'Iniciado' : 'Colocado'
    return `${company?.name} - ${append}`
  }

  let company = null
  for (const option of statusOptions) {
    if (!company) company = internship.companies.find(c => c.status === option)
    else break
  }
  return `${company?.name} - ${company?.status}`
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
