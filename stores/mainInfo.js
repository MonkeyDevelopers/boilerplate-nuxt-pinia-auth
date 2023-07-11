import { defineStore } from 'pinia';
export const useAuthStore = defineStore("useAuthStore",{
  state: () => ({
    accessToken: "",
    scope: []
  }),

  actions: {
    async setAccessToken() {
      const { getSession } = useAuth();
      const session = await getSession();
      this.accessToken = session?.user?.accessToken;
      this.scope = session?.user?.scope;
    },
  },

  getters: {
    getAccessToken() {
      return this.accessToken;
    }
  }
});
