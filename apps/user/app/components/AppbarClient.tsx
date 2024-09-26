import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function AppbarClient() {
    const session = useSession();
    const router = useRouter();
    return <div>
        <Appbar user={session.data?.user} onSignIn={signIn} onSignOut={async()=>{
            signOut();
            router.push('/api/auth/signin')
        }}/>
    </div>
}