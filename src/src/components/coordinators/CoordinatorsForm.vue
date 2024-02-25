<template>
  <div class="q-py-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-ma-lg row">
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
        />
        <q-btn
          unelevated
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
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
import { Loading } from "quasar";

const data = ref(defaultValues());
const defaults = defaultValues();
const rules = CoordinatorDTO.rules();
const route = useRoute();
const loginStore = useLoginStore();

const props = defineProps({
  edit: Boolean,
});

onMounted(async () => {
  try {
    if (props.edit) {
      Loading.show()
      await getCoordinator(route.params.id);
      Loading.hide()
    }
  } catch (error) {
    console.error(error)
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
  Loading.show()

  const output = props.edit
    ? await coordinatorsAPI.update(data.value)
    : await coordinatorsAPI.store(data.value);

  Loading.hide()
  emit("valuecreated", output);
}
</script>
