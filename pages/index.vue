<template>
  <h1>scope: {{ data?.user?.scope }}</h1>
  <h1>scope: {{ scope }}</h1>
  <button @click="showScope">Show Scope</button>
  <button @click="this.$router.push({ path: '/dashboard' })">
    Ir pro dashboard
  </button>
  <button @click="signOut({ callbackUrl: '/login' })">Sign Out</button>
</template>

<script>
import { useAuthStore } from '~/stores/mainInfo';
export default {
    setup() {
    
    const auth = useAuthStore();
    
    definePageMeta({ middleware: "auth" });
    const { data, signOut } = useAuth();
    const user = data?.user;
    return { data, signOut, definePageMeta, scope: auth.scope};
  },
  methods: {
    showScope() {
      console.log(this.scope);
    },
  },
};
</script>
