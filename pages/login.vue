<template>
  <input type="text" v-model="username" placeholder="Username" />
  <input type="text" v-model="password" placeholder="Password" />
  <button @click="mySignInHandler">Login</button>
  <h1 v-if="status == 'unauthenticated'">Voce nao esta logado</h1>
</template>
<script setup>
// definePageMeta({
//   layout: "intern",
// });
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
    alert("You have made a terrible mistake while entering your credentials");
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: true });
  }
};

</script>
