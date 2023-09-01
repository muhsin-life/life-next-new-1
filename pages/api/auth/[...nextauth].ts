import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Phone", type: "text" },
        code: { label: "Password", type: "password" },
        isPhone: { label: "isPhone", type: "text" },
      },
      authorize: async (credentials: any) => {
        var payload = {};
        if (credentials.isPhone === "true") {
          payload = {
            phone: credentials.phone,
            code: credentials.code,
          };
        } else {
          payload = {
            email: credentials.email,
            code: credentials.code,
          };
        }

        const url = "https://devapp.lifepharmacy.com/api/auth/verify-otp";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: myHeaders,
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "dark",
  },

  callbacks: {
    async jwt({ user, token }: { user: any; token: any }) {
      // token.userRole = "regusr"
      // token = user
      if (user) {
        token = user.data.user;
        token.token = user.data.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      // session.token = {}
      return session;
    },
  },
});
