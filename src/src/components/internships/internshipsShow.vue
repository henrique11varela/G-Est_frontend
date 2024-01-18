<template>
  <div>
    <q-form class="q-ma-lg">
      <q-input class="q-mb-lg" outlined v-model="internshipData.student.name" :loading="loading" label="Aluno" readonly />
      <q-input class="q-mb-lg" outlined v-model="internshipData.tutor.name" :loading="loading" label="Tutor" readonly />
      <q-input class="q-mb-lg" outlined v-model="internshipData.start_date" mask="####/##/##" :loading="loading" label="Data" readonly />
      <q-input class="q-mb-lg" outlined v-model="internshipData.address" :loading="loading" label="Morada" readonly />
      <q-input class="q-mb-lg" outlined v-model="internshipData.postcode" mask="####-###" :loading="loading" label="Codigo postal" readonly />
      <q-checkbox class="q-mb-lg" outlined v-model="internshipData.meal_allowance" label="Refeição" disable="" />
      <q-input class="q-mb-lg" outlined v-model="internshipData.observations" :loading="loading" label="Observações" readonly />
      <q-input class="q-mb-lg" outlined v-model="internshipData.company.name" :loading="loading" label="Empresa" readonly />
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import internshipsAPI from "../../services/fetches/internships.js";

const route = useRoute();
const loading = ref(false);

const internshipData = ref({
  id: "",
  student: "",
  company: "",
  tutor: "",
  start_date: "",
  address: "",
  postcode: "",
  meal_allowance: false,
  observations: "",
});

onMounted(async () => {
  loading.value = true;
  const output = await internshipsAPI.show(route.params.id)
  internshipData.value.id = output.id
  internshipData.value.student = output.student
  internshipData.value.company = output.company
  internshipData.value.tutor = output.tutor
  internshipData.value.start_date = output.start_date
  internshipData.value.address = output.address
  internshipData.value.postcode = output.postcode
  internshipData.value.meal_allowance = output.meal_allowance
  internshipData.value.observations = output.observations
  loading.value = false;
})

</script>

<style scoped></style>
