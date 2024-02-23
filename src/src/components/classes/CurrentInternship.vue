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

function setInternshipStatus(internship) {
  if (internship.endedInternship) {
    const company = internship.companies.find(c => c.status === 'Aceite')
    const append = internship.endedInternship.reason
    return `${company?.name} - Terminado (${append})`
  }

  if (internship.startedInternship) {
    const company = internship.companies.find(c => c.status === 'Aceite')
    const now = new Date()
    const startDate = new Date(internship.startedInternship.startDate)
    const append = startDate <= now ? 'Iniciado' : 'Colocado'
    return `${company?.name} - ${append}`
  }

  let company = internship.companies.find(c => c.status === 'Em Colocação')
  if (!company) company = internship.companies.find(c => c.status === 'Opção')
  if (!company) company = internship.companies.find(c => c.status === 'Não Aceite')
  return `${company?.name} - ${company?.status}`
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
