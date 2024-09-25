"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export const Appbar = ()=>{
    const session =  useSession();
    return <div className="flex justify-between">
        <div>PAYTM</div>
        <div>
            <button onClick={session?.data ? signOut : signIn}>{session.data ? "logout" : "Login"}</button>
        </div>
    </div>
}

