<template>
  <div class="q-py-md">
    <q-spinner
      color="primary"
      size="3em"
      :thickness="2"
      v-if="loading.course"
    />
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-col-gutter-md row"
      v-else
    >
      <q-input
        :readonly="submitting"
        outlined
        v-model="data.name"
        label="Curso"
        lazy-rules="ondemand"
        :rules="rules.name"
        class="col-12 col-md-5"
      />

      <q-select
        outlined
        v-model="data.type"
        :options="['APZ', 'EFA', 'CET']"
        label="Tipo"
        :readonly="submitting"
        lazy-rules="ondemand"
        :rules="rules.type"
        class="col-12 col-sm"
      />

      <q-select
        outlined
        v-model="data.area"
        :options="areas"
        label="Área"
        :readonly="submitting"
        :loading="loading.areas"
        :option-label="area => `${area.areaCode} - ${area.name}`"
        lazy-rules="ondemand"
        :rules="rules.area"
        class="col-12 col-md-3 col-sm-7"
      />

      <div class="col-12">
        <q-btn unelevated label="Guardar" type="submit" color="primary" :disabled="submitting"/>
        <q-btn unelevated label="Reset" type="reset" color="primary" flat class="q-ml-sm" :disabled="submitting"/>
        <q-spinner color="primary" size="2.5em" :thickness="2" v-if="submitting"/>
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

const data = ref(defaultValues())
const areas = ref([])
const defaults = defaultValues()
const loading = ref({
  course: false,
  areas: false
})
const submitting = ref(false)
const rules = courseDTO.rules()
const route = useRoute()

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    loading.value.course = loading.value.areas = true
    if (props.edit) await getCourse(route.params.id)
    const areasRequest = await areasAPI.index()
    areas.value = areasRequest
    loading.value.course = loading.value.areas = false
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => route.params.id,
  async newId => getCourse(newId)
)

async function getCourse(id) {
  const output = await coursesAPI.show(id)
  data.value.name = defaults.name = output.name
  data.value.type = defaults.type = output.type
  data.value.area = defaults.area = output.area
  data.value.id = output.id
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

async function onSubmit() {
  submitting.value = true

  const output = props.edit ?
  await coursesAPI.update(data.value) :
  await coursesAPI.store(data.value)

  submitting.value = false
  emit('valuecreated', output)
}
</script>
