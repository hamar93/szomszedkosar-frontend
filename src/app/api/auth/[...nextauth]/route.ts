import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
                        {
                            email: credentials?.email,
                            password: credentials?.password,
                        }
                    );

                    if (res.data && res.data.user) {
                        // Return user object including token
                        return res.data.user;
                    }
                    return null;
                } catch (error) {
                    console.error("Login failed:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = token.user as any;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
