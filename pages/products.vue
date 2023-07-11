<template>
  <h1 v-if="data?.user">Hi {{ data?.user.name }}!</h1>
  <h1 v-else>Voce nao esta logado</h1>
  <h1>{{ store.products }}</h1>
  <button @click="this.$router.push({ path: '/login' })">Entrar no Sistema</button>
  <button @click="signOut">Sair do codego</button>
</template>

<script setup>
definePageMeta({ auth: false });

import { useProductStore } from "~/stores/products";
const store = useProductStore();

const { data, signOut } = useAuth();

onMounted(() => {
  // Ação personalizada a ser executada após a montagem da aplicação
  store.getResults();
});
</script>
