<template>
  <h1>
    status: {{ status }}
  </h1>
  <h1>
    Hi {{ data?.user.name }}! I'm protected.
  </h1>
  <h2>
    data : {{ data?.user }}
  </h2>
  <h2>
    test: {{ auth.getAccessToken }}
  </h2>

  <button @click="this.$router.push({ path: '/' });">Ir pro index</button>
  <button @click="this.$router.push({ path: '/products' });">Ir pros produtos</button>
  <button @click="signOut({ callbackUrl: '/login' })">Sign Out</button>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';
const auth = useAuthStore();

const { data, signOut, status } = useAuth();

</script>
