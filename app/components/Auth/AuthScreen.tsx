"use client"

import { useState } from "react"
import { SignInCard } from "./SignInCard"
import { SignUpCard } from "./SignUpCard"

export  function AuthScreen({authType}) {

    const [formType,setFormType] = useState(authType || "signin")



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