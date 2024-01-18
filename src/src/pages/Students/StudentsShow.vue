<template>
  <q-page padding>
    <div v-if="loading">
      <q-spinner
        color="primary"
        size="3em"
        :thickness="2"
      />
    </div>
    <div class="q-pa-md" v-else>
      <div class="flex justify-between" v-if="isAdmin">
        <q-btn unelevated color="secondary" icon="edit" label="Editar" :to="`/students/edit/${route.params.id}`"/>
        <q-btn unelevated color="accent" icon="work" label="Criar estágio" :to="`/internships/add/${route.params.id}`"/>
      </div>
      <StudentsInfo :student-info="student"></StudentsInfo>
    </div>
  </q-page>
</template>

<script setup>
import StudentsInfo from 'src/components/students/StudentsInfo.vue'
import studentsAPI from 'src/services/fetches/students'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const student = ref({})
const loading = ref(false)
const route = useRoute()

const isAdmin = true

watch(
  () => route.params.id,
  newId => getStudent(newId)
)

onMounted(() => {
  getStudent(route.params.id)
})

async function getStudent(id) {
  loading.value = true
  const response = await studentsAPI.show(id)
  student.value = response
  loading.value = false
}
</script>
