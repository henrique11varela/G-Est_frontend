<template>
  <div>
    <q-form class="q-ma-lg" @submit.prevent="onSubmit">
      <div class="row">
        <q-input outlined readonly class="q-mb-md col-4" v-model="internshipData.class.name" label="Turma" type="text"
          :loading="pageState.loading" />
        <q-input outlined readonly class="q-mb-md offset-1 col-7" v-model="internshipData.student.name" label="Aluno"
          type="text" :loading="pageState.loading" />
      </div>

      <div ref="companiesElement">
        <!-- first -->
        <div v-for="numberSelect in selectedCompanies.length" :key="numberSelect" class="row">
          <div class="q-mb-md col-7">
            <q-select outlined label="Empresa" v-model="selectedCompanies[numberSelect - 1].company" use-input
              hide-selected fill-input input-debounce="500" :options="options.companies" option-label="name"
              @filter="filterCompaniesFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="q-mb-md col q-pl-lg">
            <q-select outlined label="Estado" v-model="selectedCompanies[numberSelect - 1].status"
              :options="options.status">
            </q-select>
          </div>
          <div v-if="selectedCompanies.length > 1" class="q-mb-md col-1 flex justify-center items-center">
            <q-btn color="primary" round icon="remove" @click="removeCompany(numberSelect - 1)"></q-btn>
          </div>
        </div>
        <q-btn color="primary" round class="q-mb-md" icon="add" @click="addCompany"></q-btn>
      </div>
      <!-- <q-btn color="primary" round class="q-mb-md">+</q-btn> -->

      <div v-if="startFormShow">
        <hr class="q-mb-md">
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
        <hr class="q-mb-md">

      </div>

      <q-input outlined class="q-mb-md" v-model="internshipData.observations" label="Observações" type="textarea" />

      <q-btn color="primary" type="submit">Salvar</q-btn>
      <q-btn color="primary" v-if="!startFormShow && pageState.readyStarted" @click="startFormShow = true">Iniciar
        estágio</q-btn>
      <!-- {{ internshipData }} -->
    </q-form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { qDateLocale } from "../../config/config.js";
import internshipsAPI from "../../services/fetches/internships.js";
import studentsAPI from "../../services/fetches/students.js";
import classesAPI from "../../services/fetches/classes.js";
import companiesAPI from "../../services/fetches/companies.js";

const route = useRoute();
const startFormShow = ref(false);

// GERAL
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

const pageState = ref({
  loading: false,
  edit: false,
  readyStarted: false,
  started: false,
});

// Companies colocação
const selectedCompanies = ref([
  {
    company: "",
    status: "",
  }
]);

const isAccepted = computed(() => {
  return selectedCompanies.value.some(e => e.status === 'Aceite');
});

watch(
  () => selectedCompanies,
  (val) => {
    pageState.value.readyStarted = isAccepted.value
  },
  { deep: true });

function addCompany() {
  selectedCompanies.value.push({
    company: '',
    status: ''
  })
}

function removeCompany(id) {
  selectedCompanies.value.splice(id, 1);
}

const options = ref({
  status: ['Opção', 'Em Colocação', 'Aceite', 'Não Aceite'],
  companies: [],
});

// started

const startedInternship = ref({
  date: "",
  refeição: false,
  companyPerson: "",
  companyAddress: "",
});

const endedInternship = ref({
  date: "",
  refeição: false,
  companyPerson: "",
  companyAddress: "",
});

// fetches
async function fetchInternship() {
  pageState.value.loading = true;
  const data = await internshipsAPI.index({
    student_collection_id: route.params.class,
    student_id: route.params.student,
  })

  if (data.data.length > 0) { //If there is any internship
    const internship = data.data.find((item) => {
      return item.endedInternship === null;
    });
    if (internship) { //if there is any internship that is not ended
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
  pageState.value.loading = false;
}

// lifecycle
onMounted(() => {
  fetchInternship();
});

function onSubmit() {
  // console.log(selectedCompanies.value);
  console.log(test.value);
}

// filters
function filterCompaniesFn(val, update, abort) {
  update(async () => {
    const needle = val.toLowerCase()
    const response = await companiesAPI.index({
      name: needle,
    })
    options.value.companies = response.data
    console.log(options.value.companies);
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
