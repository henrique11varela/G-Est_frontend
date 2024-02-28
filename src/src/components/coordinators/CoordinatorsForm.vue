<template>
  <div class="q-py-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-ma-lg row">
      <div class="col-12 row">
        <q-input class="col q-mr-sm"
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.name"
          label="Nome*"
          lazy-rules="ondemand"
          :rules="rules.name"
          :error="hasError('name')"
        >
        <template v-slot:error>
          <span :key="index" v-for="(message, index) in errors?.name">
            {{ message }}
          </span>
        </template>
        </q-input>

        <q-input class="col q-mx-sm"
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.emailAtec"
          label="Email*"
          lazy-rules="ondemand"
          :rules="rules.email"
          :error="hasError('email_atec')"
        >
        <template v-slot:error>
          <span :key="index" v-for="(message, index) in errors?.email_atec">
            {{ message }}
          </span>
        </template>
        </q-input>

        <q-input class="col q-ml-sm"
          :readonly="!loginStore.isAdmin"
          outlined
          v-model="data.phoneNumber"
          label="Telefone*"
          lazy-rules="ondemand"
          :rules="rules.phoneNumber"
          :error="hasError('phone_number')"
        >
        <template v-slot:error>
          <span :key="index" v-for="(message, index) in errors?.phone_number">
            {{ message }}
          </span>
        </template>
        </q-input>
      </div>

      <div v-if="loginStore.isAdmin" class="col-12">
        <q-btn
          unelevated
          label="Guardar"
          type="submit"
          color="primary"
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
import { useErrorHandling } from 'src/composables/useErrorHandling'

const data = ref(defaultValues());
const defaults = defaultValues();
const rules = CoordinatorDTO.rules();
const route = useRoute();
const loginStore = useLoginStore();
const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling()

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
    notify.serverError()
    Loading.hide()
  }
});

watch(
  () => route.params.id,
  async (newId) => getCoordinator(newId)
);

async function getCoordinator(id) {
  const output = await coordinatorsAPI.show(id);
  checkResponseErrors(output)
  if (isValid.value) {
    data.value.name = defaults.name = output.name;
    data.value.emailAtec = defaults.emailAtec = output.emailAtec;
    data.value.phoneNumber = defaults.phoneNumber = output.phoneNumber;
    data.value.id = id;
  }
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
  checkResponseErrors(output)
  Loading.hide()
  if (isValid.value) {
    props.edit ? notify.update() : notify.store()
    emit('valuecreated', output)
  }
}
</script>
