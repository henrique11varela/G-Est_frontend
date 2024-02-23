<template>
  <div class="q-py-md">
    <q-spinner color="primary" size="3em" :thickness="2" v-if="loading" />
    <q-form @submit="onSubmit" @reset="onReset" class="q-ma-lg row" v-else>
      <div class="col-12 row">
        <q-input class="col q-mr-sm"
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.name"
          label="Nome"
          lazy-rules="ondemand"
          :rules="rules.name"

        />
        <q-input class="col q-mx-sm"
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.emailAtec"
          label="Email"
          lazy-rules="ondemand"
          :rules="rules.email"

        />
        <q-input class="col q-ml-sm"
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.phoneNumber"
          label="Telefone"
          lazy-rules="ondemand"
          :rules="rules.phoneNumber"

        />
      </div>

      <div v-if="loginStore.isAdmin" class="col-12">
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
          to="/coordinators"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import CoordinatorDTO from "../../dto/CoordinatorDTO";
import { ref, onMounted, watch } from "vue";
import coordinatorsAPI from "../../services/fetches/coordinators";
import { useRoute } from "vue-router";
import { useLoginStore } from "../../stores/login.js";

const data = ref(defaultValues());
const defaults = defaultValues();
const loading = ref(false);
const submitting = ref(false);
const rules = CoordinatorDTO.rules();
const route = useRoute();
const loginStore = useLoginStore();

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    if (props.edit) {
      loading.value = true;
      await getCoordinator(route.params.id);
      loading.value = false;
    }
  } catch (error) {
    console.error(error);
  }
});

watch(
  () => route.params.id,
  async (newId) => getCoordinator(newId)
);

async function getCoordinator(id) {
  const output = await coordinatorsAPI.show(id);
  data.value.name = defaults.name = output.name;
  data.value.emailAtec = defaults.emailAtec = output.emailAtec;
  data.value.phoneNumber = defaults.phoneNumber = output.phoneNumber;
  data.value.id = id;
}

function defaultValues() {
  return { name: "", emailAtec: "", phoneNumber: "220400500" };
}

function onReset() {
  data.value.name = defaults.name;
  data.value.emailAtec = defaults.emailAtec;
  data.value.phoneNumber = defaults.phoneNumber;
}

const emit = defineEmits(["valuecreated"]);

async function onSubmit() {
  submitting.value = true;

  const output = props.edit
    ? await coordinatorsAPI.update(data.value)
    : await coordinatorsAPI.store(data.value);

  submitting.value = false;
  emit("valuecreated", output);
}
</script>
