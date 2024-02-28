<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row items-center q-gutter-md no-wrap">
        <div>
          <h1 class="text-h6">Solicitações</h1>
        </div>
        <q-btn
          v-if="loginStore.isAdmin"
          dense
          unelevated
          color="primary"
          icon="add"
          :to="'applications/add'"
        />
      </div>
      <ListAplications />
    </div>
  </q-page>
</template>

<script setup>
import ListAplications from "src/components/Applications/ApplicationsList.vue";
import { useLoginStore } from "../../stores/login.js";
const loginStore = useLoginStore();
</script>
