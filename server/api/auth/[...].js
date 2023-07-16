import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { useAuthStore } from "../../../stores/authStore"

async function refreshAccessToken(refreshToken) {
  try {
    console.warn("trying to post to refresh token");

    const refreshedTokens = await $fetch(`${PROCESS.ENV.BACK_URL}/api/refresh`, {
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
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login'
  },
  providers: [

    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials) {

        try {
          const payload = {
            username: credentials.username,
            password: credentials.password,
          };

          const userTokens = await $fetch(`${process.env.BACK_URL}/api/login`, {
            method: "post",
            body: payload,
          });
          const userDetails = await $fetch(`${process.env.BACK_URL}/api/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
              Authorization: `Bearer ${userTokens?.access_token}`,
            },
          });
          if (!userTokens || !userDetails) {
            throw createError({
              statusCode: 500,
              statusMessage: "Auth failed",
            });
          }

          const user = { ...userDetails, accessToken: userTokens.access_token };
          const store = useAuthStore();
          
          store.setToken(userTokens.access_token);
          
          
          // useAuthStore().setAccessToken(userTokens.access_token);
          return user;
        } catch (error) {
          console.warn("Error logging in", error);

          return null;
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
      session.user = {
        ...session.user,
        ...token,
      };

      return session;
    },
  },
});
