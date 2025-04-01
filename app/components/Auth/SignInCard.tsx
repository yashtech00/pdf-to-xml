"use client"


export function SignInCard() {
    return (
        <div>
            <div className="flex justify-center items-center h-screen ">
                <div className="w-[70%]">
                <form className="">
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter Your email"
                            
                        />
                    </div>
                    </form>
                    </div>
            </div>
        </div>
    )
}