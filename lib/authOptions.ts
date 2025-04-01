import { prisma } from "@/db/db";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { NextAuthOptions, Session } from "next-auth";
import { emailSchema, passwordSchema } from "./Schema";


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
            //@ts-ignore
            async authorize(credentials) {
                
                //check if credentials are empty
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const emailValidation =  emailSchema.safeParse(credentials.email);
                if (!emailValidation.success    ) {
                    return NextResponse.json("Enter a valid Email address", { status: (411) });
                }

                const passwordValidation = passwordSchema.safeParse(credentials.password);
                if (!passwordValidation.success) {
                    return NextResponse.json("Enter password in right format", { status: (411) });
                }

                try {
                    const ExistingUser = await prisma.user.findUnique({
                        where: {
                            email:emailValidation.data
                        }
                    })
                    if (!ExistingUser) {
                        const hashedPassword = await bcrypt.hash(passwordValidation.data, 10);
                        
                        const newUser = await prisma.user.create({
                            data: {
                                email: emailValidation.data,
                                password: hashedPassword,
                                provider:"GITHUB"
                            }
                        })
                        return newUser
                    }
                    
                    const passwordVerification = ExistingUser.password && await bcrypt.compare(ExistingUser.password, credentials.password);
                    if (!passwordVerification) {
                        return NextResponse.json("Wrong password",{status:(404)})
                    }
                    return ExistingUser;
                } catch (e) {
                    console.error("Internal server error", { status: (500) });
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn:"/auth"
    },
    secret: process.env.JWT_SECRET ?? "secret",
    session: {
        strategy:"jwt"
    },
    callbacks: {
        //generate jwt tokens
        async jwt({ token, account, profile, user }) {
            if (account && profile && user) {
                token.id = account.access_token,
            token.email = profile.email as string
            }
            return token; 
        },
        // generate sessions
        async session({ session, token}) {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email:token.email || ""
                    }
                })
                if (user) {
                    session.user.id = user.id
                }
            } catch (e) {
                console.error(e);
            }
            return session
        },
        //signIn callback 
        async signIn({account , profile}) {
            try {
                if (account?.provider === "github") {
                    const user = await prisma.user.findUnique({
                        where: {
                            email:profile?.email || ""
                        }
                    })
                    if (!user) {
                        const newUser = await prisma.user.create({
                            data: {
                                email: profile?.email || "",
                                provider:"GITHUB"
                            }
                        })
                    }
                }
                
                return true
            } catch (e) {
                console.error(e);
                return false
                
            }
        }

    }
} satisfies NextAuthOptions