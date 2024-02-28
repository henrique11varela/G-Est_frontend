<template>
  <q-page padding>
    <h2>Solicitação</h2>
    <ApllicationsInputs :application="apllication" :edit="false"/>
  </q-page>
</template>

<script>
import ApllicationsInputs from 'src/components/Applications/ApplicationsForm.vue';
import applicationsAPI from 'src/services/fetches/applications';
import { useRoute } from 'vue-router';

export default {
  components: {
    ApllicationsInputs,
  },

  data() {
    return {
      apllication: {
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
      },
    };
  },

  async mounted() {
    const route = useRoute();
    const id = route.params.id;
    this.apllication = await applicationsAPI.show(id);
  },

};
</script>
