<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    definePageMeta({
      auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
      },
    });
  },
});
</script>