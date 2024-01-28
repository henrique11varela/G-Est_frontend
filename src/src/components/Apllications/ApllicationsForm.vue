<template>
  <div class="q-p-md">
    <q-form @submit="submit" @reset="onReset" class="q-gutter-md">
      <div class="row justify-between">
        <div class="col-md-5">
          <q-input
            outlined
            v-model="company_name"
            label="Nome da Empresa"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            type="number"
            outlined
            v-model="number_of_trainees"
            label="Número de Estagiários"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="activity_sector"
            label="Setor de Atividade"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-select
            class="col-5"
            outlined
            v-model="course_application"
            :options="course_application_options"
            label="Curso Pretendido"
          />
        </div>
        <div class="col-md-5">
          <q-checkbox left-label v-model="partner" label="Já é Parceiro?" />
        </div>
      </div>

      <hr />

      <div class="row justify-between">
        <div class="col-md-5">
          <q-input
            outlined
            v-model="contact_name"
            label="Nome do Contato"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="contact_telephone"
            label="Telefone"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="contact_email"
            label="Email do Contato"
            lazy-rules
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-md-5">
          <q-input outlined v-model="website" label="Website" />
        </div>
        <div class="col-md-5">
          <q-input outlined v-model="locality" label="Localidade" />
        </div>
        <div class="col-md-5">
          <q-input
            outlined
            v-model="student_tasks"
            label="Tarefas a desempenhar"
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
    };
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
