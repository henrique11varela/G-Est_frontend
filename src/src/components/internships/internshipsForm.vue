<template>
  <div>
    <q-form class="q-ma-lg" @submit.prevent="onSubmit">
      <div class="row q-mb-md">
        <!-- Class -->
        <div class="col q-pr-lg">
          <q-input outlined readonly class="q-mb-md col-4" v-model="internshipData.class.name" label="Turma" type="text"
            :loading="pageState.loading" />
        </div>
        <!-- student -->
        <div class="col-8">
          <q-input outlined readonly class="q-mb-md offset-1 col-7" v-model="internshipData.student.name" label="Aluno"
            type="text" :loading="pageState.loading" />
        </div>
      </div>

      <!-- Companies -->
      <div ref="companiesElement">
        <div v-for="numberSelect in internshipData.companies.length" :key="numberSelect" class="row">
          <div class="q-mb-md col-7">
            <q-select outlined label="Empresa" v-model="internshipData.companies[numberSelect - 1]" use-input
              hide-selected fill-input input-debounce="500" :options="options.companies"
              :readonly="isAccepted || pageState.isSubmitting || pageState.ended" :loading="pageState.loadingCompanies" option-label="name"
              @filter="filterCompaniesFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <q-btn flat round icon="add" class="cursor-pointer"
                  @click.stop="openCompanyForm(numberSelect - 1)"></q-btn>
              </template>
            </q-select>
          </div>
          <div class="q-mb-md col q-pl-lg">
            <q-select outlined label="Estado" v-model="internshipData.companies[numberSelect - 1].status"
              :options="options.status"
              :readonly="(isAccepted && internshipData.companies[numberSelect - 1].status != 'Aceite') || internshipData.companies[numberSelect - 1].company == '' || pageState.isSubmitting || pageState.ended">
            </q-select>
          </div>
          <div v-if="internshipData.companies.length > 1 && !isAccepted && !pageState.isSubmitting && !pageState.started"
            class="q-mb-md col-1 flex justify-center items-center">
            <q-btn color="primary" round icon="remove" @click="removeCompany(numberSelect - 1)"></q-btn>
          </div>
        </div>
        <q-btn color="primary" v-if="!isAccepted && !pageState.isSubmitting && !pageState.started" round class="q-mb-md"
          icon="add" @click="addCompany"></q-btn>
      </div>

      <!-- Started -->
      <div v-if="pageState.started">
        <hr class="q-mb-md">
        <!-- Dates -->
        <div class="row">
          <div class="col q-pr-sm">
            <q-input outlined v-model="internshipData.startedInternship.startDate" mask="date" :rules="['date']"
              :readonly="pageState.isSubmitting || pageState.ended" label="Data de Inicio">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="internshipData.startedInternship.startDate" :locale="qDateLocale"
                      :readonly="pageState.isSubmitting || pageState.ended">
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
            <q-input outlined v-model="internshipData.startedInternship.endDate" mask="date" :rules="['date']"
              :readonly="pageState.isSubmitting || pageState.ended" label="Data de Fim">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="internshipData.startedInternship.endDate" :locale="qDateLocale"
                      :readonly="pageState.isSubmitting || pageState.ended">
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

        <!-- MealAllowance -->
        <q-checkbox label="Refeição" class="q-mb-md" v-model="internshipData.startedInternship.mealAllowance"
          :disable="pageState.isSubmitting || pageState.ended" />

        <!-- Tutor -->
        <q-select outlined label="Tutor" v-model="internshipData.startedInternship.tutor" use-input hide-selected
          fill-input input-debounce="500" :options="optionsTutors" option-label="name" @filter="filterTutorsFn"
          :readonly="pageState.isSubmitting || pageState.ended" class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:append>
            <q-btn flat round icon="add" class="cursor-pointer" @click.stop="openTutorForm"></q-btn>
          </template>
        </q-select>

        <!-- Address -->
        <q-select outlined label="Morada" v-model="internshipData.startedInternship.address" use-input hide-selected
          fill-input input-debounce="500" :options="optionsAddresses" option-label="description"
          :readonly="pageState.isSubmitting || pageState.ended" @filter="filterMoradaFn" class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:append>
            <q-btn flat round icon="add" class="cursor-pointer" @click.stop="openAddressForm"></q-btn>
          </template>
        </q-select>

        <hr class="q-mb-md">

      </div>
      <!-- ended -->
      <div v-if="pageState.ended">
        <!-- reason -->
        <q-select outlined label="Situação de Aprovação" v-model="internshipData.endedInternship.reason"
          :options="options.reason"
          :readonly="pageState.isSubmitting" class="q-mb-md col-7">
        </q-select>
        <!-- situação proficional -->
        <q-select outlined label="Situação profissional" v-model="internshipData.endedInternship.situacaoProf"
          :options="options.situacaoProf"
          :readonly="pageState.isSubmitting" class="q-mb-md col-7">
        </q-select>
        <!-- reason -->
        <q-select outlined label="Como Obteve emprego" v-model="internshipData.endedInternship.comoObteveEmprego"
          :options="options.comoObteveEmprego"
          :readonly="pageState.isSubmitting" class="q-mb-md col-7">
        </q-select>

        <hr class="q-mb-md">
      </div>

      <!-- Observations -->
      <q-input outlined class="q-mb-md" :readonly="pageState.isSubmitting" v-model="internshipData.observations" label="Observações" type="textarea" />

      <div class="row">
        <q-btn color="primary" class="col-3" type="submit" :disable="pageState.isSubmitting">Salvar</q-btn>
        <q-btn color="primary" class="col-3 offset-6" v-if="!pageState.started && pageState.readyToBeStarted"
          :disable="pageState.isSubmitting" @click="startInternship">Iniciar
          estágio</q-btn>
        <q-btn color="primary" class="col-3 offset-6" v-if="pageState.started && pageState.edit && !pageState.ended"
          :disable="pageState.isSubmitting" @click="endInternship">Terminar
          estágio</q-btn>
      </div>
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
import { useInnerFormStore } from "../../stores/innerForm.js";
import notify from '../../composables/notify.js';

const route = useRoute();
const innerFormStore = useInnerFormStore();

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
      name: "",
      status: "",
    },
  ],
  startedInternship: null,
  endedInternship: null,
});

const pageState = ref({
  isSubmitting: false,
  loading: false,
  loadingCompanies: false,
  edit: false,
  readyToBeStarted: false,
  started: false,
  ended: false,
});

// Companies colocação

const isAccepted = computed(() => {
  return internshipData.value.companies.some(e => e.status === 'Aceite');
});

const acceptedCompany = computed(() => {
  return internshipData.value.companies.find(e => e.status === 'Aceite');
});

watch(
  () => internshipData.value.companies,
  (val) => {
    if (pageState.value.started && val.every((item) => item.status != 'Aceite')) {
      internshipData.value.startedInternship.address = '';
      internshipData.value.startedInternship.tutor = '';
    }
    pageState.value.readyToBeStarted = isAccepted.value
  },
  { deep: true }
);

function addCompany() {
  internshipData.value.companies.push({
    name: "",
    status: ''
  })
}

function removeCompany(index) {
  internshipData.value.companies.splice(index, 1);
}

const options = ref({
  status: ['Opção', 'Em Colocação', 'Aceite', 'Não Aceite'],
  reason: ['Aprovado', 'Reprovado', 'Desistente'],
  situacaoProf: ['Empregado/a', 'Desempregado/a', 'Em formação (Ensino Superior ou outra)', 'Aguardar ingresso no Ensino Superior ou outra formação', 'Em processo de contratação', 'Aguardar Estágio Profissional', 'Outra', 'S/ Informação', 'Em formação - CET ATEC'],
  comoObteveEmprego: ['Integração na empresa de FPCT', 'Através da ATEC', 'Criou o próprio emprego', 'Resposta a anúncio', 'Conhecimentos pessoais', 'Outra', 'Trabalhava na empresa durante a FPCT'],
  companies: [],
});

const optionsTutors = ref([]);

const optionsAddresses = ref([]);

// started

function startInternship() {
  internshipData.value.startedInternship = {
    startDate: "",
    endDate: "",
    mealAllowance: false,
    tutor: "",
    address: "",
  }
  pageState.value.started = true;
}

// ended

async function endInternship() {
  internshipData.value.endedInternship = {
    reason: "",
    situacaoProf: "",
    comoObteveEmprego: "",
  }
  pageState.value.ended = true;
}

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

async function onSubmit() {
  pageState.value.isSubmitting = true;
  //TOTO: validation

  let response = null
  if (pageState.value.edit) {
    response = await internshipsAPI.update(internshipData.value)
  } else {
    response = await internshipsAPI.store(internshipData.value)
    pageState.value.edit = true;
  }
  if (response.requestStatus == 200) {
    if (!pageState.value.edit) {
      notify.store()
    } else {
      notify.update()
    }
  }
  if (response.id) {
    internshipData.value = await internshipsAPI.show(response.id)
  }
  pageState.value.isSubmitting = false;
  emit('valuecreated', response)
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
  update(async () => {
    pageState.value.loadingCompanies = true;
    const needle = val.toLowerCase()
    const response = await companiesAPI.show(acceptedCompany.value.id)
    optionsTutors.value = response.tutors?.filter((item) => {
      return item.name.toLowerCase().indexOf(needle) > -1;
    })
    pageState.value.loadingCompanies = false;
  })
}

function filterMoradaFn(val, update, abort) {
  update(async () => {
    pageState.value.loadingCompanies = true;
    const needle = val.toLowerCase()
    const response = await companiesAPI.show(acceptedCompany.value.id)
    console.log(response);
    optionsAddresses.value = response.addresses?.filter((item) => {
      return item.description.toLowerCase().indexOf(needle) > -1 || item.address.toLowerCase().indexOf(needle) > -1;
    })
    pageState.value.loadingCompanies = false;
  })
}

async function openCompanyForm(index) {
  internshipData.value.companies[index] = await innerFormStore.openInnerForm('companies/CompanyFrom')
}

async function openTutorForm() {
  const tempTutor = await innerFormStore.openInnerForm('companiesPeople/CompanyPeopleFrom', acceptedCompany.value.id)
  if (tempTutor.isTutor) {
    internshipData.value.startedInternship.tutor = tempTutor
  }
}

async function openAddressForm() {
  internshipData.value.startedInternship.address = await innerFormStore.openInnerForm('companyAddressesList/CompanyAddressesFrom', acceptedCompany.value.id)
}

</script>

<style scoped></style>
