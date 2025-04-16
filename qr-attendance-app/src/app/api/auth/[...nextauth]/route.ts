// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/auth/auth.ts";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

