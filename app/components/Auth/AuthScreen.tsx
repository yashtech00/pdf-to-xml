"use client"

import { useState } from "react"
import { SignInCard } from "./SignInCard"
import { SignUpCard } from "./SignUpCard"

export  function AuthScreen({authtype}) {

    const [formType,setFormType] = useState(authtype || "signin")



    return (
        <div>
            {formType === "signin" ? (
            <SignInCard />
            ) : (
                    <SignUpCard/>
            )}
        </div>
    )
}