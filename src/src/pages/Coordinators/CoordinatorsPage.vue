<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row items-center q-gutter-md no-wrap">
        <div>
          <h1 class="text-h6">Coordenadores</h1>
        </div>
        <q-btn
          v-if="loginStore.isAdmin"
          dense
          unelevated
          color="primary"
          icon="add"
          :to="'/coordinators/add'"
        />
      </div>
      <CoordinatorsList></CoordinatorsList>
    </div>
  </q-page>
</template>

<script setup>
import CoordinatorsList from "../../components/coordinators/CoordinatorsList.vue";
import { useLoginStore } from "../../stores/login.js";

const loginStore = useLoginStore();
</script>
