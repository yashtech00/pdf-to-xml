"use client"

import { useSearchParams } from "next/navigation"
import { AuthScreen } from "../components/Auth/AuthScreen"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Auth() {
    
    const searchParams = useSearchParams();
    const formType = searchParams.get("authType");
    const session = useSession();
    const router = useRouter();

    if (session.status === "authenticated") {
        router.push("/");
    }

    return <AuthScreen authtype={ formType} />
}