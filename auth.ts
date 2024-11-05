import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        // Lógica para GitHub
        const { name, email, image } = user;
        const { id, login, bio } = profile;

        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_ID_QUERY, {
            id,
          });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          });
        }
        return true;
      } else if (account.provider === "google") {
        // Lógica específica para Google
        return profile.email_verified && profile.email.endsWith("@example.com");
      }

      return true; // Permitir otros proveedores si se agregan en el futuro
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
