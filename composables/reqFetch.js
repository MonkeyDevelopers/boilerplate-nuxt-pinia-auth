import { useAuthStore } from "@/stores/authStore";

export async function reqFetch(
  url,
  method = "GET",
  params = {},
  data = {}
) {


  const authStore = useAuthStore();

  const config = useRuntimeConfig();

  // const headers = await authStore.authHeader();
  if (!authStore.getToken) {
    const headers = useRequestHeaders(['cookie']);
    const { data: token } = await useFetch('/api/token', { headers })
    await authStore.setToken(token._rawValue.accessToken);
  }
  const options = {
    baseURL: config.public.baseURL,
    method,
    params,
    headers: {
      Authorization: `Bearer ${authStore.getToken}`,
      "Content-Type": "application/json",
    },
  };

  if (method === "POST" || method === "PUT") {
    options["body"] = data;
  }

  return useFetch(url, options);
}
