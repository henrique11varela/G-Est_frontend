<template>
  <div class="q-py-md">
    <q-spinner
      color="primary"
      size="3em"
      :thickness="2"
      v-if="loading.studentClass"
    />
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md row"
      v-else
    >
      <q-input
        :readonly="submitting || !loginStore.isAdmin"
        outlined
        v-model="data.name"
        label="Turma"
        lazy-rules="ondemand"
        :rules="rules.name"
        class="col-12 col-sm-4"
      />

      <q-select
        outlined
        label="Curso"
        v-model="data.course"
        use-input hide-selected fill-input
        input-debounce="500"
        :options="courses"
        :readonly="submitting || !loginStore.isAdmin"
        :loading="loading.courses"
        :option-label="course => `${course.name} - ${course.type}`"
        @filter="filterCoursesFn"
        lazy-rules="ondemand"
        :rules="rules.course"
        class="col-12 col-sm">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey" v-if="!loading.courses">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        outlined
        label="Coordenador"
        v-model="data.coordinator"
        use-input hide-selected fill-input
        input-debounce="500"
        :options="coordinators"
        :readonly="submitting || !loginStore.isAdmin"
        :loading="loading.coordinators"
        :option-label="coordinator => coordinator.name"
        @filter="filterCoordinatorsFn"
        lazy-rules="ondemand"
        :rules="rules.coordinator"
        class="col-12 col-sm">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey" v-if="!loading.coordinators">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div class="col-12" v-if="loginStore.isAdmin">
        <q-btn unelevated label="Guardar" type="submit" color="primary" :disabled="submitting" />
        <q-btn unelevated label="Reset" type="reset" color="primary" flat class="q-ml-sm" :disabled="submitting" />
        <q-spinner color="primary" size="2.5em" :thickness="2" v-if="submitting"/>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import classDTO from '../../dto/ClassDTO'
import { ref, onMounted, watch } from 'vue'
import coursesAPI from '../../services/fetches/courses'
import classesAPI from '../../services/fetches/classes'
import coordinatorsAPI from '../../services/fetches/coordinators'
import { useRoute } from "vue-router"
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()

const data = ref(defaultValues())
const defaults = defaultValues()
const courses = ref([])
const coordinators = ref([])
const loading = ref({
  studentClass: false,
  courses: false,
  coordinators: false
})
const submitting = ref(false)
const rules = classDTO.rules()
const route = useRoute()

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    loading.value.studentClass = true
    if (props.edit) await getClass(route.params.id)
    loading.value.studentClass = false
  } catch (error) {
    console.error(error)
  }
})

function filterCoursesFn(val, update, abort) {
  update(async () => {
    loading.value.courses = true
    const response = await coursesAPI.index({
      name: val,
    })
    console.log(response)
    courses.value = response.data
    loading.value.courses = false
  })
}

function filterCoordinatorsFn(val, update, abort) {
  update(async () => {
    loading.value.coordinators = true
    const response = await coordinatorsAPI.index({
      name: val,
    })
    console.log(response)
    coordinators.value = response.data
    loading.value.coordinators = false
  })
}

watch(
  () => route.params.id,
  async newId => getClass(newId)
)

async function getClass(id) {
  const output = await classesAPI.show(id)
  data.value.name = defaults.name = output.name
  data.value.course = defaults.course = output.course
  data.value.coordinator = defaults.coordinator = output.coordinator
  data.value.id = output.id
}

function defaultValues() {
  return { name: "", course: null, coordinator: null }
}

function onReset() {
  data.value.name = defaults.name
  data.value.course = defaults.course
  data.value.coordinator = defaults.coordinator
}

const emit = defineEmits(['valuecreated'])

async function onSubmit() {
  submitting.value = true

  const output = props.edit ?
  await classesAPI.update(data.value) :
  await classesAPI.store(data.value)

  submitting.value = false
  emit('valuecreated', output)
}
</script>
