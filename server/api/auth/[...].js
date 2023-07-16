import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { useAuthStore } from "@/stores/authStore";


async function refreshAccessToken(refreshToken) {
  try {
    console.warn("trying to post to refresh token");

    const refreshedTokens = await $fetch("https://domain.directus.app/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        refresh_token: refreshToken.refreshToken,
        mode: "json",
      },
    });

    if (!refreshedTokens || !refreshedTokens.data) {
      console.warn("No refreshed tokens");
      throw refreshedTokens;
    }

    console.warn("Refreshed tokens successfully");
    return {
      ...refreshToken,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.data.refresh_token,
    };
  } catch (error) {
    console.warn("Error refreshing token", error);
    return {
      ...refreshToken,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: process.env.NUXT_SECRET,

  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials) {
        // console.log(credentials);

        try {
          const payload = {
            username: credentials.username,
            password: credentials.password,
          };

          const userTokens = await getUserTokens(payload);
          const userDetails = await getUserDetails(userTokens.access_token);
          if (!userTokens || !userDetails) {
            throw createError({
              statusCode: 500,
              statusMessage: "Auth failed",
            });
          }

          const user = {
            user: userDetails,
            accessToken: userTokens.access_token,
          };

          // save Token to store
          const authStore = useAuthStore();
          // authStore.setToken();
          authStore.setToken(userTokens.access_token);

          return user;
        } catch (error) {
          console.warn("Error logging in", error);

          return null;
        }

        async function getUserTokens(payload) {
          return $fetch(`${process.env.BACK_URL}/api/login`, {
            method: "POST",
            body: payload,
          });
        }

        async function getUserDetails(token) {
          return $fetch(`${process.env.BACK_URL}/api/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      console.warn("Calling async session", session, token);
      session.user = {
        ...session.user,
        ...token,
      };

      return session;
    },
  },
});
