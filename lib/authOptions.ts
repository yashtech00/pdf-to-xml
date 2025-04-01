import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";


export const authOptions = {
    providers: [
        //Github Provider
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        }),
        //Credentials Provider
        Credentials({
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                
                //check if credentials are empty
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const emailValidation = await EmailSchema.safeParse(credentials.email);
                if (!emailValidation) {
                    return NextResponse.json("Enter a valid Email address", { status: (411) });
                }

                const passwordValidation = await PasswordSchema.safeParse(credentials.password);
                if (!passwordValidation) {
                    return NextResponse.json("Enter password in right format", { status: (411) });
                }




                return null;
            }
        })
    ]
} 