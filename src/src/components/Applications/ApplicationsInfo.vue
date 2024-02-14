<template>
  <div class="q-p-md">
    <q-form @submit="submit" @reset="onReset" class="q-gutter-md">
      <div class="row justify-between">
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.companyName"
            label="Nome da Empresa"
            :readonly="!edit"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            type="number"
            outlined
            v-model="applicationData.numberStudents"
            label="Número de Estagiários"
            :readonly="!edit"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.activitySector"
            label="Setor de Atividade"
            :readonly="!edit"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-select
            class="col-5"
            outlined
            v-model="applicationData.course_application"
            :readonly="!edit"
            :options="course_application_options"
            label="Curso Pretendido"
          />
        </div>
        <div class="col-md-5">
          <q-checkbox
            left-label
            v-model="applicationData.isPartner"
            disable
            label="Já é Parceiro?"
             />
        </div>
      </div>

      <hr />

      <div class="row justify-between">
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.contactName"
            label="Nome do Contato"
            :readonly="!edit"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.contactTelephone"
            label="Telefone"
            :readonly="!edit"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.contactEmail"
            label="Email do Contato"
            :readonly="!edit"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.website"
            label="Website"
            :readonly="!edit"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.locality"
            label="Localidade"
            :readonly="!edit"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="applicationData.studentTasks"
            label="Tarefas a desempenhar"
            :readonly="!edit"
          />
        </div>
      </div>
      <hr />

    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicationData: {
      company_name: "",
      number_of_trainees: "",
      activity_sector: "",
      course_application: "",
      partner: false,
      course_application_options: ["TPSI", "GISP"],
      contact_name: "",
      contact_telephone: "",
      contact_email: "",
      website: "",
      locality: "",
      student_tasks: "",
      },
    };
  },
  watch: {
    application(val) {
      this.applicationData = val;
    },
  },
  props: {
    application: {
      type: Object,
      default: () => {},
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>


<!-- Rule to acept only letters  and accented characters-->
          <!-- :rules="[(val) => !!val || 'Campo Obrigatório', (val) => /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u0020]*$/.test(val) || 'Only letters are allowed']" -->

          <!-- Rule to acept a valid email  -->
          <!-- :rules="[(val) => !!val || 'Campo Obrigatório', (val) => /.+@.+\..+/.test(val) || 'E-mail must be valid']" -->

          <!-- Rule to acept a valid phone number  -->
          <!-- :rules="[(val) => !!val || 'Campo Obrigatório', (val) => /^\d{9}$/.test(val) || 'Phone number must be valid']" -->

          <!-- Rule to acept a valid website  -->
          <!-- :rules="[(val) => !!val || 'Campo Obrigatório', (val) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val) || 'Website must be valid']" -->

          <!-- Rule to acept a number only between 1 and 20 -->
          <!-- :rules="[(val) => !!val || 'Campo Obrigatório', (val) => /^[1-9]$|^[1][0-9]$|^[2][0]$/.test(val) || 'Number of trainees must be between 1 and 20']" -->
