"use client";

import Link from "next/link";
import { useState } from "react";

export function SignInCard() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            
        } catch (e) {
            
        }
    }







    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col justify-center md:flex-row bg-white-300 shadow-lg rounded-lg overflow-hidden w-[30%] ">
                <div className="p-8 w-full">
                    <h1 className="flex justify-center text-xl font-bold mb-6">Sign In</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="Password"
                                required
                                placeholder="Enter your Password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                        <p className="flex justify-center">Don't have an account 
                        <Link href={{
                            pathname: "/auth",
                            query: {
                                authType:"signup"
                            }
                        }}>
                         <h1 className="mx-2 text-blue-600 underline">Sign up</h1>
                            </Link>
                            </p>
                    </form>
                </div>
                
            </div>
        </div>
    );
}