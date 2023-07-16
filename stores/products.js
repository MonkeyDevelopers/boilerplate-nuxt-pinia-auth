import { defineStore } from 'pinia';
export const useProductStore = defineStore("useProductStore",{
  state: () => ({
    product: {},
    products: [],
    backurl: process.env.BACK_URL,
  }),

  actions: {
    async getResults() {
      // const products = await $fetch(`${PROCESS.ENV.BACK_URL}/api/products`, {headers: {}});
      const users = await reqFetch("/api/v1/users");
      this.products = users;
      this.product = users[0];
    },
  },
});
