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
        const { getSession } = useAuth();
        const session = await getSession();
        this.accessToken = session?.user?.accessToken;
        console.log(this.accessToken);
        return;
      }
      console.log("Setting token", token)
      this.accessToken = token;
    },
    authHeader(){
      return {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      };
    },
    test() {
      return reqFetch("/organisations");
    },
  },

  getters: {
    getToken() {
      return this.accessToken;
    },
  },
});
