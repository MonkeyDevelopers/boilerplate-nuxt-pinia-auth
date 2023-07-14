import { useAuthStore } from "@/stores/authStore";

export function reqFetch(
  url,
  method = "GET",
  params = {},
  data = {}
) {
  const authStore = useAuthStore();

  const config = useRuntimeConfig();

  const options = {
    baseURL: config.public.baseURL,
    method,
    params,
    headers: authStore.authHeader(),
  };

  if (method === "POST" || method === "PUT") {
    options["body"] = data;
  } 

  return useFetch(url, options );
}
