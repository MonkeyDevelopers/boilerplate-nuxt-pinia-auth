<template>
  <h1 v-if="data?.user">Hi {{ data?.user.name }}!</h1>
  <h1 v-else>Voce nao esta logado</h1>
  <h1>{{ store.products }}</h1>
  <h1>{{ authStore.getToken }}</h1>
  <button @click="this.$router.push({ path: '/login' })">Entrar no Sistema</button>
  <button @click="signOut">Sair do codego</button>
</template>

<script setup>
definePageMeta({ auth: false });

import { useProductStore } from "~/stores/products";
import { useAuthStore } from "~/stores/authStore";
const store = useProductStore();
const authStore = useAuthStore();

const { data, signOut } = useAuth();

onMounted(() => {
  // Ação personalizada a ser executada após a montagem da aplicação
  store.getResults();
});
</script>
