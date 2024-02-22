<template>
  <div class="q-py-md">
    <q-spinner color="primary" size="3em" :thickness="2" v-if="loading" />
    <q-form @submit="onSubmit" @reset="onReset" class="q-ma-lg" v-else>
      <div class="col-12 row">
        <q-input
          class="col q-mr-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.companyName"
          label="Nome da Empresa"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>

        <q-input
          class="col q-mx-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.numberStudents"
          label="Número de Estagiários"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>

        <q-input
          class="col q-ml-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.activitySector"
          label="Setor de Atividade"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
      </div>
      <div class="col-12">
        <q-checkbox
          :disable="!LoginStore.isAdmin"
          left-label
          v-model="data.isPartner"
          label="Já é Parceiro?"
        ></q-checkbox>
      </div>

      <div class="col-12 row">
        <q-input
          class="col q-mr-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.contactName"
          label="Nome de Contacto"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
        <q-input
          class="col q-mx-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.contactTelephone"
          label="Telefone"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
        <q-input
          class="col q-ml-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.contactEmail"
          label="Email"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
      </div>
      <div class="col-12 row">
        <q-input
          class="col q-mr-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.website"
          label="Website"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
        <q-input
          class="col q-ml-sm"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.locality"
          label="Localidade"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
      </div>
      <div class="col-12 row">
        <q-input class="col"
          type="textarea"
          :readonly="!LoginStore.isAdmin"
          outlined
          v-model="data.studentTasks"
          label="Tarefas a desempenhar"
          lazy-rules="ondemand"
          :rules="rules.name"
        ></q-input>
      </div>

      <div v-if="LoginStore.isAdmin" class="col-12">
        <q-btn
          unelevated
          label="Guardar"
          type="submit"
          color="primary"
          :disabled="submitting"
        />
        <q-btn
          unelevated
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          :disabled="submitting"
        />

        <q-spinner
          color="primary"
          size="2.5em"
          :thickness="2"
          v-if="submitting"
        />
      </div>
      <div class="col-12">
        <hr />
        <q-btn
          type="submit"
          label="Voltar"
          color="primary"
          to="/applications"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import ApplicationDTO from "../../dto/ApplicationDTO";
import { ref, onMounted, watch } from "vue";
import applicationsAPI from "../../services/fetches/applications";
import { useRoute } from "vue-router";
import { useLoginStore } from "../../stores/login.js";

const data = ref(defaultValues());
const defaults = defaultValues();
const loading = ref(false);
const submitting = ref(false);
const rules = ApplicationDTO.rules();
const route = useRoute();
const LoginStore = useLoginStore();

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    if (props.edit) {
      loading.value = true;
      getApplication(route.params.id);
      loading.value = false;
    }
  } catch (error) {
    console.error(error);
  }
});

watch(
  () => route.params.id,
  async (newId) => getApplication(newId)
);

async function getApplication(id) {
  data.value = await applicationsAPI.show(id);
}

function defaultValues() {
  return { name: "" };
}

function onReset() {
  data.value.name = defaults.name;
}

const emit = defineEmits(["valuecreated"]);

async function onSubmit() {
  submitting.value = true;

  const output = props.edit
    ? await applicationsAPI.update(data.value)
    : await applicationsAPI.store(data.value);

  submitting.value = false;
  emit("valuecreated", output);
}
</script>
