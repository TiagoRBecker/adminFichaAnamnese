import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/auth/refreshToken/admin`,
      { refreshToken: token.refreshToken }
    );

    const newTokens = response.data;

    return {
      ...token,
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refresh,
      accessTokenExpires: newTokens.exp,
    };
  } catch (error) {
    return {
      token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  pages: {
    signOut: "/",
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const dto = {
          email: credentials?.email,
          password: credentials?.password,
        };
        try {
          const data = await axios.post(
            `${process.env.API_URL}/auth/admin/signin`,
            dto
          );

          return {
            ...data.data,
          };
        } catch (error: any) {
          throw new Error(error.response?.data.message || "Erro ao autenticar");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refresh;
        token.accessTokenExpires = user.exp;
      }
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user = {
        id: token.id,
        name: token.name,
        accessToken: token.accessToken,
        error: token.error,
      };
      return session;
    },
  },
};
