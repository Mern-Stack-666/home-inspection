import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        // ── SEEDING LOGIC (For initial setup) ──
        // Check if there are any admins. If not, create one from .env
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0 && process.env.ADMIN_EMAIL) {
          console.log("Seeding initial admin from .env...");
          await Admin.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
          });
        }

        const admin = await Admin.findOne({ email: credentials.email });

        if (admin && (await bcrypt.compare(credentials.password, admin.password))) {
          return { id: admin._id, email: admin.email, name: "Admin" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
