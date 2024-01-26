<template>
  <div>
    <q-form class="q-ma-lg" @submit.prevent="onSubmit">



      <q-btn color="primary" type="submit">Submit</q-btn>
      {{ internshipData }}
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import internshipsAPI from "../../services/fetches/internships.js";

const route = useRoute();
const loading = ref(false);

const internshipData = ref({
  id: "",
  student_id: "",
  student_collection_id: "",
  observations: "",
  companies: [],
  startedInternship: null,
  endedInternship: null,
});

async function fetchInternship() {
  loading.value = true;
  const data = await internshipsAPI.index({
    student_collection_id: route.params.class_id,
    student_id: route.params.student_id,
  })
  // student.value = data
  loading.value = false;
}

onMounted(() => {
  fetchInternship();
});

function onSubmit() {
}

</script>

<style scoped></style>
