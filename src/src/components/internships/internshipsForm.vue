<template>
  <div>
    <q-form @submit.prevent="onSubmit">
      <div class="row q-mb-md">
        <!-- Class -->
        <div class="col q-pr-lg">
          <q-input outlined readonly class="q-mb-md col-4" :error="hasError('student_collection_id')"
            v-model="internshipData.class.name" label="Turma" type="text" :loading="pageState.loading" />
        </div>
        <!-- student -->
        <div class="col-8">
          <q-input outlined readonly class="q-mb-md offset-1 col-7" :error="hasError('student_id')"
            v-model="internshipData.student.name" label="Aluno" type="text" :loading="pageState.loading" />
        </div>
      </div>

      <!-- Companies -->
      <div ref="companiesElement">
        <div v-for="numberSelect in internshipData.companies.length" :key="numberSelect" class="row">
          <div class="q-mb-md col-7">
            <q-select outlined label="Empresa" v-model="internshipData.companies[numberSelect - 1]" use-input
              hide-selected fill-input input-debounce="500" :options="options.companies" :error="hasError('companies')"
              :rules="[(val) => !!val || 'Selecione uma Empresa']"
              :readonly="isAccepted || pageState.isSubmitting || pageState.ended || !loginStore.isAdmin"
              :loading="pageState.loadingCompanies" option-label="name" @filter="filterCompaniesFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <q-btn flat round icon="add" class="cursor-pointer"
                  v-if="!isAccepted && !pageState.isSubmitting && loginStore.isAdmin"
                  @click.stop="openCompanyForm(numberSelect - 1)"></q-btn>
              </template>
            </q-select>
          </div>
          <div class="q-mb-md col q-pl-lg">
            <q-select outlined label="Estado" v-model="internshipData.companies[numberSelect - 1].status"
              :options="options.status" :error="hasError('companies')" :rules="[(val) => !!val || 'Selecione uma opção']"
              :readonly="(isAccepted && internshipData.companies[numberSelect - 1].status != 'Aceite') || internshipData.companies[numberSelect - 1].name == '' || pageState.isSubmitting || pageState.ended || !loginStore.isAdmin">
            </q-select>
          </div>
          <div
            v-if="internshipData.companies.length > 1 && !isAccepted && !pageState.isSubmitting && !pageState.started && loginStore.isAdmin"
            class="q-mb-md col-1 flex justify-center items-center">
            <q-btn color="primary" class="q-mb-md" round icon="remove" @click="removeCompany(numberSelect - 1)"></q-btn>
          </div>
        </div>
        <q-btn color="primary" v-if="!isAccepted && !pageState.isSubmitting && !pageState.started && loginStore.isAdmin"
          round class="q-mb-md" icon="add" @click="addCompany"></q-btn>
      </div>

      <!-- Started -->
      <div v-if="pageState.started">
        <hr class="q-mb-md">
        <!-- Dates -->
        <div class="row">
          <div class="col q-pr-sm">
            <q-input outlined v-model="internshipData.startedInternship.startDate" mask="date"
              :error="hasError('started_internship.start_date')" :rules="['date']"
              :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" label="Data de Inicio">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="internshipData.startedInternship.startDate"
                      :error="hasError('started_internship.start_date')" :locale="qDateLocale"
                      :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin">
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
              :error="hasError('started_internship.end_date')"
              :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" label="Data de Fim">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="internshipData.startedInternship.endDate" :locale="qDateLocale"
                      :error="hasError('started_internship.end_date')"
                      :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin">
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

        <div class="q-mb-md row">

          <!-- MealAllowance -->
          <div class="col-3">
            <q-checkbox label="Refeição" v-model="internshipData.startedInternship.mealAllowance"
              :error="hasError('started_internship.meal_allowance')"
              :disable="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" />
            <div class="text-negative" :key="index"
              v-for="(message, index) in errors['started_internship.meal_allowance']">
              {{ message }}
            </div>
          </div>

          <div class="col-3">
            <q-checkbox label="Morada de envio é sede" class="col-3"
              :error="hasError('started_internship.hq_shipping_address')"
              v-model="internshipData.startedInternship.hqShippingAddress"
              :disable="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" />
            <div class="text-negative" :key="index"
              v-for="(message, index) in errors['started_internship.hq_shipping_address']">
              {{ message }}
            </div>
          </div>

          <div class="col-6">
            <q-input outlined class="q-ml-sm" v-model="internshipData.startedInternship.hourlyLoad"
              :error="hasError('started_internship.hourly_load')" :rules="['numeric']"
              :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" label="Carga Horária"
              type="number" min="0">
              <template v-slot:error>
                <span :key="index" v-for="(message, index) in errors['started_internship.hourly_load']">
                  {{ message }}
                </span>
              </template>
            </q-input>
          </div>

        </div>

        <!-- Address -->
        <q-select outlined label="Morada" v-model="internshipData.startedInternship.address" use-input hide-selected
          fill-input input-debounce="500" :options="optionsAddresses" :option-label="moradaDisplay"
          :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" @filter="filterMoradaFn"
          class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:append>
            <q-btn flat round icon="add" class="cursor-pointer" @click.stop="openAddressForm"
              v-if="!pageState.isSubmitting && !pageState.ended && loginStore.isAdmin"></q-btn>
          </template>
        </q-select>

        <!-- Tutor -->
        <q-select outlined label="Tutor" v-model="internshipData.startedInternship.tutor" use-input hide-selected
          fill-input input-debounce="500" :options="optionsTutors" option-label="name" @filter="filterTutorsFn"
          :readonly="pageState.isSubmitting || pageState.ended || !loginStore.isAdmin" class="q-mb-md col-7">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:append>
            <q-btn flat round icon="add" class="cursor-pointer" @click.stop="openTutorForm"
              v-if="!pageState.isSubmitting && !pageState.ended && loginStore.isAdmin"></q-btn>
          </template>
        </q-select>
        <hr class="q-mb-md">
      </div>
      <!-- ended -->
      <div v-if="pageState.ended">
        <!-- reason -->
        <q-select outlined label="Situação de Aprovação" v-model="internshipData.endedInternship.reason"
          :options="options.reason" :readonly="pageState.isSubmitting || !loginStore.isAdmin" class="q-mb-md col-7">
        </q-select>
        <!-- situação proficional -->
        <q-select outlined label="Situação profissional" v-model="internshipData.endedInternship.situacaoProf"
          :options="options.situacaoProf" :readonly="pageState.isSubmitting || !loginStore.isAdmin" class="q-mb-md col-7">
        </q-select>
        <!-- reason -->
        <q-select outlined label="Como Obteve emprego" v-model="internshipData.endedInternship.comoObteveEmprego"
          :options="options.comoObteveEmprego" :readonly="pageState.isSubmitting || !loginStore.isAdmin"
          class="q-mb-md col-7">
        </q-select>

        <hr class="q-mb-md">
      </div>

      <!-- Observations -->
      <q-input outlined class="q-mb-md" :readonly="pageState.isSubmitting || !loginStore.isAdmin"
        v-model="internshipData.observations" label="Observações" type="textarea" />

      <div class="row" v-if="loginStore.isAdmin">
        <q-btn color="primary" class="col-3" type="submit" :disable="pageState.isSubmitting">Guardar</q-btn>
        <q-btn color="primary" class="col-3 offset-6" v-if="showIniciarButton" :disable="pageState.isSubmitting"
          @click="startInternship">Iniciar
          estágio</q-btn>
        <q-btn color="primary" class="col-3 offset-6" v-if="showTerminarButton" :disable="pageState.isSubmitting"
          @click="endInternship">Terminar
          estágio</q-btn>
      </div>
      <!-- {{ internshipData }} -->
    </q-form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Loading } from 'quasar'
import { qDateLocale } from "../../config/config.js";
import internshipsAPI from "../../services/fetches/internships.js";
import studentsAPI from "../../services/fetches/students.js";
import companiesAPI from "../../services/fetches/companies.js";
import { useInnerFormStore } from "../../stores/innerForm.js";
import notify from '../../composables/notify.js';
import { useLoginStore } from "../../stores/login.js";
import CompanyFormComponent from "../companies/CompanyFrom.vue";
import CompanyPeopleFormComponent from "../companiesPeople/CompanyPeopleFrom.vue";
import CompanyAddressFormComponent from "../companyAddressesList/CompanyAddressesFrom.vue";
import { useErrorHandling } from 'src/composables/useErrorHandling'

const route = useRoute();
const innerFormStore = useInnerFormStore();
const loginStore = useLoginStore();
const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling()

const emit = defineEmits(['valuecreated'])

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

const showIniciarButton = computed(() => {
  return isAccepted.value && !pageState.value.started

})
const showTerminarButton = computed(() => {
  return pageState.value.started && !pageState.value.ended && !!internshipData.value.startedInternship?.startDate && !!internshipData.value.startedInternship?.endDate && !!internshipData.value.startedInternship?.hourlyLoad && !!internshipData.value.startedInternship?.tutor && !!internshipData.value.startedInternship?.address
})

// Companies colocação

const isAccepted = computed(() => {
  return internshipData.value.companies.some(e => e.status === 'Aceite') && internshipData.value.companies.every(e => e.name != '' && e.status != '');
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
  internshipData.value.companies = internshipData.value.companies.filter((item) => item.id != null);
  internshipData.value.startedInternship = {
    startDate: "",
    endDate: "",
    mealAllowance: false,
    hqShippingAddress: false,
    hourlyLoad: 0,
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
  if (route.params.id) {
    const data = await internshipsAPI.show(route.params.id)
    internshipData.value = data;
    pageState.value.edit = true;
    pageState.value.started = !!data.startedInternship;
    pageState.value.ended = !!data.endedInternship;
  } else {
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
  }
  pageState.value.loading = false;
}

// lifecycle
onMounted(() => {
  fetchInternship();
});

async function onSubmit() {
  Loading.show({
    backgroundColor: 'black',
  })
  pageState.value.isSubmitting = true;

  let response = null
  if (pageState.value.edit) {
    response = await internshipsAPI.update(internshipData.value)
  } else {
    response = await internshipsAPI.store(internshipData.value)
    pageState.value.edit = true;
  }
  checkResponseErrors(response)
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
  Loading.hide()
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

    optionsAddresses.value = response.addresses?.filter((item) => {
      return item.description.toLowerCase().indexOf(needle) > -1 || item.address.toLowerCase().indexOf(needle) > -1;
    })
    pageState.value.loadingCompanies = false;
  })
}

function moradaDisplay(item) {
  if (item.description && item.address) {
    return item.description + ' --- ' + item.address
  }
  return ''
}

async function openCompanyForm(index) {
  internshipData.value.companies[index] = await innerFormStore.openInnerForm(CompanyFormComponent)
}

async function openTutorForm() {
  const tempTutor = await innerFormStore.openInnerForm(CompanyPeopleFormComponent, acceptedCompany.value.id)
  if (tempTutor.isTutor) {
    internshipData.value.startedInternship.tutor = tempTutor
  }
}

async function openAddressForm() {
  internshipData.value.startedInternship.address = await innerFormStore.openInnerForm(CompanyAddressFormComponent, acceptedCompany.value.id)
}

</script>

<style scoped></style>
