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
        <div v-for="numberSelect in internshipData.companies.length" :key="numberSelect" class="row">
          <div class="q-mb-md col-7">
            <q-select outlined label="Empresa" v-model="internshipData.companies[numberSelect - 1].company" use-input
              hide-selected fill-input input-debounce="500" :options="options.companies" :readonly="isAccepted || pageState.isSubmitting"
              :loading="pageState.loadingCompanies" option-label="name" @filter="filterCompaniesFn">
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
            <q-select outlined label="Estado" v-model="internshipData.companies[numberSelect - 1].status"
              :options="options.status"
              :readonly="(isAccepted && internshipData.companies[numberSelect - 1].status != 'Aceite') || internshipData.companies[numberSelect - 1].company == '' || pageState.isSubmitting">
            </q-select>
          </div>
          <div v-if="internshipData.companies.length > 1 && !isAccepted && !pageState.isSubmitting" class="q-mb-md col-1 flex justify-center items-center">
            <q-btn color="primary" round icon="remove" @click="removeCompany(numberSelect - 1)"></q-btn>
          </div>
        </div>
        <q-btn color="primary" v-if="!isAccepted && !pageState.isSubmitting" round class="q-mb-md" icon="add" @click="addCompany"></q-btn>
      </div>


      <div v-if="pageState.started">
        <hr class="q-mb-md">
        <div class="row">
          <div class="col q-pr-sm">
            <q-input outlined v-model="internshipData.startedInternship.startingDate" mask="date" :rules="['date']" :readonly="pageState.isSubmitting"
              label="Data de Inicio">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="internshipData.startedInternship.startingDate" :locale="qDateLocale" :readonly="pageState.isSubmitting">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col q-pl-sm">
            <q-input outlined v-model="internshipData.startedInternship.endingDate" mask="date" :rules="['date']" :readonly="pageState.isSubmitting"
              label="Data de Fim">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="internshipData.startedInternship.endingDate" :locale="qDateLocale" :readonly="pageState.isSubmitting">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <q-checkbox label="Refeição" class="q-mb-md" v-model="internshipData.startedInternship.mealAllowance" :disable="pageState.isSubmitting" />

        <q-select outlined label="Tutor" v-model="internshipData.startedInternship.companyPerson" use-input hide-selected
          fill-input input-debounce="500" :options="optionsTutors" option-label="name" @filter="filterTutorsFn" :readonly="pageState.isSubmitting"
          class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select outlined label="Morada" v-model="internshipData.startedInternship.companyAddress" use-input
          hide-selected fill-input input-debounce="500" :options="optionsAddresses" option-label="description" :readonly="pageState.isSubmitting"
          @filter="filterMoradaFn" class="q-mb-md col-7">
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
      <q-btn color="primary" v-if="!pageState.started && pageState.readyToBeStarted" @click="startInternship">Iniciar
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
import companiesAPI from "../../services/fetches/companies.js";

const route = useRoute();

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
  companies: [
    {
      company: "",
      status: "Opção",
    },
  ],
  startedInternship: {
    startingDate: "",
    endingDate: "",
    mealAllowance: false,
    companyPerson: "",
    companyAddress: "",
  },
  endedInternship: null,
});

const pageState = ref({
  isSubmitting: false,
  loading: false,
  loadingCompanies: false,
  edit: false,
  readyToBeStarted: false,
  started: false,
});

// Companies colocação

const isAccepted = computed(() => {
  return internshipData.value.companies.some(e => e.status === 'Aceite');
});

const acceptedCompany = computed(() => {
  return internshipData.value.companies.find(e => e.status === 'Aceite').company;
});

watch(
  () => internshipData.value.companies,
  (val) => {
    if (pageState.value.started && val.every((item) => item.status != 'Aceite')) {
      internshipData.value.startedInternship.companyAddress = '';
      internshipData.value.startedInternship.companyPerson = '';
    }
    pageState.value.readyToBeStarted = isAccepted.value
  },
  { deep: true }
);

function addCompany() {
  internshipData.value.companies.value.push({
    company: '',
    status: 'Opção'
  })
}

function removeCompany(id) {
  internshipData.value.companies.value.splice(id, 1);
}

const options = ref({
  status: ['Opção', 'Em Colocação', 'Aceite', 'Não Aceite'],
  companies: [],
});

const optionsTutors = ref([]);

const optionsAddresses = ref([]);

// started

function startInternship() {
  pageState.value.started = true;
}

// ended



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
    internshipData.value.class = internshipData.value.student.classes.find((item) => item.id == route.params.class)
  }
  pageState.value.loading = false;
}

// lifecycle
onMounted(() => {
  fetchInternship();
});

function onSubmit() {
  pageState.value.isSubmitting = true;
  console.log(internshipData.value);
  // SUBMIT LOGIC
  pageState.value.isSubmitting = false;
}

// filters
function filterCompaniesFn(val, update, abort) {
  update(async () => {
    pageState.value.loadingCompanies = true;
    const needle = val.toLowerCase()
    const response = await companiesAPI.index({
      name: needle,
    })
    options.value.companies = response.data
    pageState.value.loadingCompanies = false;
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
  update(async () => {
    const needle = val.toLowerCase()
    optionsAddresses.value = acceptedCompany.value.addresses.filter((item) => {
      return item.description.toLowerCase().indexOf(needle) > -1 || item.address.toLowerCase().indexOf(needle) > -1;
    })
  })
}

</script>

<style scoped></style>
