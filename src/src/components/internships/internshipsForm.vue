<template>
  <div>
    <q-form class="q-ma-lg" @submit.prevent="onSubmit">
      <div class="row">
        <q-input outlined readonly class="q-mb-md col-4" v-model="internshipData.class.name" label="Turma" type="text"
          :loading="loading" />
        <q-input outlined readonly class="q-mb-md offset-1 col-7" v-model="internshipData.student.name" label="Aluno"
          type="text" :loading="loading" />
      </div>

      <div ref="companiesElement">
        <!-- first -->
        <div v-for="numberSelect in 3" :key="numberSelect" class="row">
          <q-select outlined label="Empresa" v-model="companyTest[numberSelect - 1].company" use-input hide-selected fill-input
            input-debounce="500" :options="options.companies" option-label="name" @filter="filterCompaniesFn"
            class="q-mb-md col-7">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-select outlined label="Estado" v-model="companyTest[numberSelect - 1].status" :options="options.status"
            class="q-mb-md offset-1 col-4">
          </q-select>
        </div>
      </div>
      <!-- <q-btn color="primary" round class="q-mb-md">+</q-btn> -->

      <div v-if="startFormShow">
        <q-input outlined v-model="date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date" :locale="qDateLocale">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-checkbox label="Refeição" v-model="refeição" />

        <q-select outlined label="Tutor" v-model="companyPerson" use-input hide-selected fill-input input-debounce="500"
          :options="options.companies" option-label="name" @filter="filterTutorsFn" class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select outlined label="Morada" v-model="companyAddress" use-input hide-selected fill-input input-debounce="500"
          :options="options.companies" option-label="name" @filter="filterMoradaFn" class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

      </div>

      <q-input outlined class="q-mb-md" v-model="internshipData.observations" label="Observations" type="textarea" />

      <q-btn color="primary" type="submit">Salvar</q-btn>
      <q-btn color="primary" v-if="!startFormShow" @click="startFormShow = true">Iniciar estágio</q-btn>
      <!-- {{ internshipData }} -->
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { qDateLocale } from "../../config/config.js";
import internshipsAPI from "../../services/fetches/internships.js";
import studentsAPI from "../../services/fetches/students.js";
import classesAPI from "../../services/fetches/classes.js";
import companiesAPI from "../../services/fetches/companies.js";

const startFormShow = ref(false);

//TODO: REMOVE THIS TRASH CODE, IT'S JUST FOR TESTING
const companyTest = ref([
  {
    company: "",
    status: "",
  },
  {
    company: "",
    status: "",
  },
  {
    company: "",
    status: "",
  },
])

const date = ref(null);
const refeição = ref(false);
const companyPerson = ref();
const companyAddress = ref();

//END TODO

const route = useRoute();
const loading = ref(false);
const pageState = ref({
  edit: false,
  started: false,
});

const options = ref({
  status: ['Aceite', 'Em Colocação', 'Não Aceite'],
  companies: [],
});

const internshipData = ref({
  id: "",
  class: {
    name: "",
  },
  student: {
    name: "",
  },
  observations: "",
  companies: [],
  startedInternship: null,
  endedInternship: null,
});

async function fetchInternship() {
  loading.value = true;
  const data = await internshipsAPI.index({
    student_collection_id: route.params.class,
    student_id: route.params.student,
  })

  if (data.data.length > 0) {
    const internship = data.data.find((item) => {
      return item.endedInternship === null;
    });
    if (internship) {
      internshipData.value = internship;
      pageState.value.edit = true;
      if (internshipData.value.startedInternship) {
        pageState.value.started = true;
      }
    }
  }
  if (!pageState.value.edit) {
    internshipData.value.student = await studentsAPI.show(route.params.student);
    internshipData.value.class = await classesAPI.show(route.params.class);
  }
  console.log(internshipData.value);
  loading.value = false;
}

async function fetchCompanies() {
  const response = await companiesAPI.index();
  options.value.companies = response.data;
  console.log(options.value.companies);
}

onMounted(() => {
  fetchInternship();
  fetchCompanies()
});

function onSubmit() {
}

function filterCompaniesFn(val, update, abort) {
  update(async () => {
    const needle = val.toLowerCase()
    const response = await companiesAPI.index({
      name: needle,
    })
    options.value.companies = response.data
  })
}
function filterTutorsFn(val, update, abort) {
  // update(async () => {
  //   const needle = val.toLowerCase()
  //   const listOfTutors = internshipData.value.companies.find((item) => {
  //     return item.company.id === companyPerson;
  //   }).tutors;
  //   // .filter((item) => {
  //   //   return item.name.toLowerCase().indexOf(needle) > -1;
  //   // })
  // })
}
function filterMoradaFn(val, update, abort) {
  // update(async () => {
  //   const needle = val.toLowerCase()
  //   const listOfTutors = internshipData.value.companies.find((item) => {
  //     return item.company.id === companyPerson;
  //   }).tutors;
  //   // .filter((item) => {
  //   //   return item.name.toLowerCase().indexOf(needle) > -1;
  //   // })
  // })
}

</script>

<style scoped></style>
