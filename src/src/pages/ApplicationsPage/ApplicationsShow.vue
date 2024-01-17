<template>
  <q-page padding>
    <h2>Solicitação</h2>
    <ApllicationsInputs />
  </q-page>
</template>

<script>
import ApllicationsInputs from 'src/components/Apllications/ApllicationsInputs.vue';


export default {
  components: {
    ApllicationsInputs,
  },

  data() {
    return {
      company_name: '',
      number_of_trainees: '',
      activity_sector: '',
      course_application: '',
      partner: '',
      contact_name: '',
      contact_email: '',
      contact_telephone: '',
      website: '',
      locality: '',
      student_tasks: '',
    };
  },
};
</script>
