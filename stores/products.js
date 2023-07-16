import { defineStore } from 'pinia';



export const useProductStore = defineStore("useProductStore",{
  state: () => ({
    product: {},
    users: [],
    backurl: process.env.BACK_URL,
  }),

  actions: {
    async getResults() {
      const users = await reqFetch("/api/v1/users");
      this.users = users
    },
  },
});
