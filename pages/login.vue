<template>
  <input type="text" v-model="username" placeholder="Username" />
  <input type="text" v-model="password" placeholder="Password" />
  <button @click="mySignInHandler">Login</button>
  <h1 v-if="status == 'unauthenticated'">Voce nao esta logado</h1>
</template>
<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
});

const username = ref("");
const password = ref("");

const { signIn, status } = useAuth();

const mySignInHandler = async () => {
  const { error, url } = await signIn("credentials", {
    username: username.value,
    password: password.value,
    redirect: false,
    callbackUrl: "/dashboard",
  });
  if (error) {
    toast('Erro ao fazer login..!!', { position: 'bottom-center', transition: 'flip', type: 'error' });
  } else {
    toast('Login efetuado com sucesso!!', { position: 'bottom-center', transition: 'flip', type: 'success' });

    setTimeout(() => {
      navigateTo(url, { external: true });
    }, 1000);
  }
  

};

</script>