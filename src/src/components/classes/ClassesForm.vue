<template>
  <div class="q-py-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-col-gutter-md row"
    >
      <q-input
        :readonly="!loginStore.isAdmin"
        outlined
        v-model="data.name"
        label="Turma"
        lazy-rules="ondemand"
        :rules="rules.name"
        :error="hasError('name')"
        class="col-12 col-sm-4">
        <template v-slot:error>
          <span :key="index" v-for="(message, index) in errors.name">
            {{ message }}
          </span>
        </template>
      </q-input>

      <q-select
        outlined
        label="Curso"
        v-model="data.course"
        use-input hide-selected fill-input
        input-debounce="500"
        :options="courses"
        :readonly="!loginStore.isAdmin"
        :loading="loading.courses"
        :option-label="course => `${course.name} - ${course.type}`"
        :error="hasError('course_id')"
        @filter="filterCoursesFn"
        lazy-rules="ondemand"
        :rules="rules.course"
        class="col-12 col-sm">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey" v-if="loading.courses">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:error>
          <span :key="index" v-for="(message, index) in errors.course_id">
            {{ message }}
          </span>
        </template>
      </q-select>

      <q-select
        outlined
        label="Coordenador"
        v-model="data.coordinator"
        use-input hide-selected fill-input
        input-debounce="500"
        :options="coordinators"
        :readonly="!loginStore.isAdmin"
        :loading="loading.coordinators"
        :option-label="coordinator => coordinator.name"
        :error="hasError('coordinator_id')"
        @filter="filterCoordinatorsFn"
        lazy-rules="ondemand"
        :rules="rules.coordinator"
        class="col-12 col-sm">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey" v-if="loading.coordinators">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:error>
          <span :key="index" v-for="(message, index) in errors.coordinator_id">
            {{ message }}
          </span>
        </template>
      </q-select>

      <div class="col-12" v-if="loginStore.isAdmin">
        <q-btn unelevated label="Guardar" type="submit" color="primary"/>
        <q-btn unelevated label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
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
import { Loading } from 'quasar'
import { useErrorHandling } from 'src/composables/useErrorHandling'
import notify from 'src/composables/notify'

const data = ref(defaultValues())
const defaults = defaultValues()
const courses = ref([])
const coordinators = ref([])
const loading = ref({
  courses: false,
  coordinators: false
})
const rules = classDTO.rules()
const route = useRoute()
const loginStore = useLoginStore()
const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling()

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    if (props.edit) {
      Loading.show()
      await getClass(route.params.id)
      Loading.hide()
    }
  } catch (error) {
    notify.serverError()
    Loading.hide()
  }
})

function filterCoursesFn(val, update, abort) {
  update(async () => {
    loading.value.courses = true
    const response = await coursesAPI.index({
      name: val,
    })
    checkResponseErrors(response)
    if (isValid.value) courses.value = response.data
    loading.value.courses = false
  })
}

function filterCoordinatorsFn(val, update, abort) {
  update(async () => {
    loading.value.coordinators = true
    const response = await coordinatorsAPI.index({
      name: val,
    })
    checkResponseErrors(response)
    if (isValid.value) coordinators.value = response.data
    loading.value.coordinators = false
  })
}

watch(
  () => route.params.id,
  async newId => getClass(newId)
)

async function getClass(id) {
  const output = await classesAPI.show(id)
  checkResponseErrors(output)
  if (isValid.value) {
    data.value.name = defaults.name = output.name
    data.value.course = defaults.course = output.course
    data.value.coordinator = defaults.coordinator = output.coordinator
    data.value.id = output.id
  }
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
  Loading.show()
  const output = props.edit ?
  await classesAPI.update(data.value) :
  await classesAPI.store(data.value)
  checkResponseErrors(output)
  Loading.hide()

  if (isValid.value) {
    props.edit ? notify.update() : notify.store()
    emit('valuecreated', output)
  }
}
</script>
