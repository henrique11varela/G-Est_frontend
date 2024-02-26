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
        label="Curso"
        lazy-rules="ondemand"
        :rules="rules.name"
        class="col-12 col-md-5"
        :error="hasError('name')"
      >
      <template v-slot:error>
        <span :key="index" v-for="(message, index) in errors.name">
          {{ message }}
        </span>
      </template>
      </q-input>

      <q-select
        outlined
        v-model="data.type"
        :options="['APZ', 'EFA', 'CET']"
        label="Tipo"
        :readonly="!loginStore.isAdmin"
        lazy-rules="ondemand"
        :rules="rules.type"
        class="col-12 col-sm"
        :error="hasError('type')"
      >
      <template v-slot:error>
        <span :key="index" v-for="(message, index) in errors.type">
          {{ message }}
        </span>
      </template>
      </q-select>

      <q-select
        outlined
        v-model="data.area"
        :options="areas"
        label="Área"
        use-input hide-selected fill-input
        input-debounce="500"
        :readonly="!loginStore.isAdmin"
        :loading="loading.areas"
        :option-label="area => `${area.areaCode} - ${area.name}`"
        @filter="filterAreasFn"
        lazy-rules="ondemand"
        :rules="rules.area"
        class="col-12 col-md-3 col-sm-7"
        :error="hasError('area_id')"
      >
      <template v-slot:error>
        <span :key="index" v-for="(message, index) in errors.area_id">
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
import courseDTO from '../../dto/CourseDTO'
import { ref, onMounted, watch } from 'vue'
import coursesAPI from '../../services/fetches/courses'
import { useRoute } from "vue-router"
import areasAPI from 'src/services/fetches/areas'
import { useLoginStore } from 'src/stores/login'
import { Loading } from 'quasar'
import { useErrorHandling } from 'src/composables/useErrorHandling'
import notify from 'src/composables/notify'

const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling()
const loginStore = useLoginStore()

const data = ref(defaultValues())
const areas = ref([])
const defaults = defaultValues()
const loading = ref({
  areas: false
})
const rules = courseDTO.rules()
const route = useRoute()

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    if (props.edit) {
      Loading.show()
      await getCourse(route.params.id)
      Loading.hide()
    }
  } catch (error) {
    notify.serverError()
    Loading.hide()
  }
})

watch(
  () => route.params.id,
  async newId => getCourse(newId)
)

async function getCourse(id) {
  const output = await coursesAPI.show(id)
  checkResponseErrors(output)
  if (isValid.value) {
    data.value.name = defaults.name = output.name
    data.value.type = defaults.type = output.type
    data.value.area = defaults.area = output.area
    data.value.id = output.id
  }
}

function defaultValues() {
  return { name: "", type: "", area: null }
}

function onReset() {
  data.value.name = defaults.name
  data.value.type = defaults.type
  data.value.area = defaults.area
}

const emit = defineEmits(['valuecreated'])

function filterAreasFn(val, update, abort) {
  update(async () => {
    loading.value.areas = true
    const response = await areasAPI.index({
      name: val,
      area_code: val
    })
    checkResponseErrors(response)
    if (isValid.value) areas.value = response.data
    loading.value.areas = false
  })
}

async function onSubmit() {
  Loading.show()
  const output = props.edit ?
  await coursesAPI.update(data.value) :
  await coursesAPI.store(data.value)
  checkResponseErrors(output)
  Loading.hide()
  if (isValid.value) {
    props.edit ? notify.update() : notify.store()
    emit('valuecreated', output)
  }
}
</script>
