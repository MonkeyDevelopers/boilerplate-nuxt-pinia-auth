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
      const products = ["product1", "product2", "product3"];https://desktop.postman.com/?desktopVersion=10.15.0&userId=10064343&teamId=886951
      this.products = products;
      this.product = products[0];
    },
  },
});
