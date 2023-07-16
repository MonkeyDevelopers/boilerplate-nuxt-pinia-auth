import { defineStore } from "pinia";
export const useAuthStore = defineStore("authStore", {
  // Estado inicial
  state: () => ({
    accessToken: "",
  }),

  actions: {
    async setToken(token) {
      if (!token) {
        console.log("Setting token")
        const { getSession, getToken } = useAuth();
        const session = await getSession();
        this.accessToken = session?.user?.accessToken;
        console.log(this.accessToken);
        return;
      }
      console.log("Setting token", token)
      this.accessToken = token;
    },
    async authHeader(){
      const { getToken } = useAuth();
      return {
        Authorization: `Bearer ${getToken}`,
        "Content-Type": "application/json",
      };
    },
    async test() {
      return reqFetch("/api/v1/users");
    },
  },

  getters: {
    getToken() {
      return this.accessToken;
    },
  },
});
