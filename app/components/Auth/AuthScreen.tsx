"use client"

import { useState } from "react"
import { SignInCard } from "./SignInCard"
import { SignUpCard } from "./SignUpCard"
import { SignInflow } from "@/types/auth-type"

export function AuthScreen({ authtype }: { authtype: SignInflow }) {

    const [formType, setFormType] = useState(authtype || "signin")

    return (
        <div>
            {formType === "signin" ? (
                <SignInCard setFormType={setFormType} />
            ) : (
                <SignUpCard setFormType={setFormType} />
            )}
        </div>
    )
}