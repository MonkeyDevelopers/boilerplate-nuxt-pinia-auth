import { defineStore } from 'pinia';
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    accessToken: "",
  }),

  actions: {
    async setToken() {
      const { getSession } = useAuth();
      const session = await getSession();
      this.accessToken = session?.user?.accessToken;
    },
    testFetch() {
      return reqFetch("/organisations");
    },
    authHeader() {
      return {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      };
    },
  },

  getters: {
    getToken() {
      return this.accessToken;
    },
  },
});
