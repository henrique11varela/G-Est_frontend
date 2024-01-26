<template>
    <div class="q-py-md">
    <q-spinner
      color="primary"
      size="3em"
      :thickness="2"
      v-if="loading"
    />
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md row"
      v-else
    >
      <q-input
        outlined
        v-model="data.name"
        label="Turma"
        lazy-rules="ondemand"
        :rules="rules.name"
        class="col-12 col-sm-auto"
      />

      <q-select
        outlined
        v-model="data.course"
        :options="courses"
        label="Curso"
        lazy-rules="ondemand"
        :rules="rules.course"
        :option-label="course => course.name"
        :display-value="data.course ? data.course.name : 'Escolha o curso'"
        class="col-12 col-sm-auto"
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
import classDTO from '../../dto/ClassDTO'
import { ref, onMounted, defineEmits, watch } from 'vue'
import coursesAPI from '../../services/fetches/courses'
import classesAPI from '../../services/fetches/classes'
import { useRoute } from "vue-router"

const data = ref(defaultValues())
const defaults = defaultValues()
const courses = ref(null)
const loading = ref(false)
const submitting = ref(false)
const rules = classDTO.rules()
const route = useRoute();

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    loading.value = true
    if (props.edit) getClass(route.params.id)
    courses.value = await coursesAPI.index()
    loading.value = false
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => route.params.id,
  async newId => getClass(newId)
)

async function getClass(id) {
  const output = await classesAPI.show(id)
  data.value.name = defaults.name = output.name
  data.value.course = defaults.course = output.course
  data.value.id = id
}

function defaultValues() {
  return { name: "", course: null }
}

function onReset() {
  data.value.name = defaults.name
  data.value.course = defaults.course
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
