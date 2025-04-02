"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { SignInflow } from "@/types/auth-type";

interface SignInFlowProps{
    setFormType:(state:SignInflow)=>void
}

export function SignUpCard({setFormType:setState}:SignInFlowProps) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const SignInWithProvider = async (provider: "GITHUB" | "CREDENTIALS") => {
        try {
            if (provider === "CREDENTIALS") {
                const res = signIn(provider, {
                    email,
                    password,
                    redirect: false,
                    callbackUrl: "/dashboard"
                })
                res.then((res) => {
                    if (res?.error) {
                        setError(res.error)
                    }
                    if (!res?.error) {
                        router.push("/")
                    }
                    setPending(false);
                })
            } else if (provider === "GITHUB") {

                const res = signIn(provider, {
                    redirect: false,
                    callbackUrl: "/dashboard"
                })
                res.then((res) => {
                    if (res?.error) {
                        setError(res.error);
                    }
                    if (!res?.error) {
                        router.push("/")
                    }
                    setPending(false);
                })
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleCredentials = async (provider: "CREDENTIALS") => {
        setError("");
        SignInWithProvider(provider);
    }
    const handleGithub = async (provider: "GITHUB") => {
        setError("");
        setPending(true);
        SignInWithProvider(provider);
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className=" flex justify-between gap-4 w-[90%]  p-4 ">
            <div className="flex flex-col justify-center md:flex-row bg-white-300  overflow-hidden w-[30%] ">
                    <div className="p-8 w-full mt-12">
                        <h1 className="text-2xl font-bold mb-4">PDF-XML:</h1>
                    <h1 className="flex text-xl font-semibold mb-6">Sign Up</h1>
                    <form className="space-y-4" >
                        <div className="space-y-2 flex justify-center">
                            <button className="text-white bg-black px-4 py-2 w-full  rounded-lg" onClick={(e) => handleGithub("GITHUB")}>
                                Continue with Github
                            </button>
                        </div>
                        <h1 className="text-gray-500">--------------- or Signup with Email--------------</h1>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                    type="email"
                                    disabled={pending}
                                    value={email}
                                required
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="Password"
                                    required
                                    disabled={pending}
                                value={password}
                                placeholder="Enter your Password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => handleCredentials("CREDENTIALS")}
                                disabled={pending}
                        >
                            Sign In
                        </button>
                        <p className="flex justify-center">Already have an account?
                           
                                <span className="mx-2 text-blue-600 underline" onClick={()=>setState("signin")}>Log in</span>
                           
                        </p>
                    </form>
                </div>
                        
            </div>
            <div>
                <Image src="https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150268421.jpg" height={700} width={700} alt="Mobile Application Development" />
            </div>
            </div>
        </div>
    );
}