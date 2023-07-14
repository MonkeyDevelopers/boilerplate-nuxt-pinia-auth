import { defineStore } from 'pinia';
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    accessToken: "",
  }),

  actions: {
    async setAccessToken() {
      const { getSession } = useAuth();
      const session = await getSession();
      this.accessToken = session?.user?.accessToken;
    },
    testFetch() {
      return reqFetch("/organisations");
    }
  },

  getters: {
    getToken() {
      return this.accessToken;
    },
  },
});
