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
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar turma</h1>
        <div v-if="isAdmin">
          <q-btn unelevated color="negative" icon="delete" label="Apagar" @click="confirmDelete"/>
        </div>
      </div>
      <ClassesForm @class-submit="editClass"
      :default-name="classInfo.name"
      :default-start-date="classInfo.startDate"
      :default-course="classInfo.course"
    ></ClassesForm>
    </div>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'


const classInfo = ref({})
const loading = ref(true)
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const isAdmin = true

watch(
  () => route.params.id,
  async newId => {
    getClass(newId)
  }
)

onUnmounted(()=> console.log("unmonted"))

onMounted(() => {
  getClass(route.params.id)
})

async function getClass(id) {
  loading.value = true
  const response = await classesAPI.show(id)
  const { name, course, startDate } = response
  classInfo.value = { name, course, startDate }
  loading.value = false
}

async function editClass(editedClass) {
  const id = route.params.id
  editedClass.id = id
  const response = await classesAPI.update(editedClass)
  $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Editado'
  })
  router.push(`/classes/show/${id}`)
}

async function deleteClass() {
  const response = await classesAPI.destroy(route.params.id)
  console.log(response)
  $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Apagado'
  })
  router.push('/classes')
}

function confirmDelete () {
  $q.dialog({
    title: 'Apagar',
    message: 'Tem a certeza que pretende apagar a turma?',
    cancel: true
  }).onOk(() => {
    deleteClass()
  })
}
</script>
