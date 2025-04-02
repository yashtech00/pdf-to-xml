"use client"

import { useSearchParams } from "next/navigation"
import { AuthScreen } from "../components/Auth/AuthScreen"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInflow } from "@/types/auth-type";
import { useEffect } from "react";

export default function Auth() {
    
    const searchParams = useSearchParams();
    const formType = searchParams.get("authType") as SignInflow;
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/dashboard");
        }
    },[session.status,router])
    

    return <AuthScreen authtype = {formType} />
}