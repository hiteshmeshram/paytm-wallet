import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import  db  from "@repo/db/client"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                phone: { label: "phone number", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials: any) {
                const hashedPassword =await bcrypt.hash(credentials.password,10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                })

                if (existingUser) {
                    // console.log(existingUser.number)
                    // console.log(existingUser.password)
                    const passwordValidations = await bcrypt.compare(credentials.password,existingUser.password);
                    if (passwordValidations) {
                        return {
                            id: existingUser.id.toString(),
                            email: existingUser.email,
                            name: existingUser.name
                        }
                    } else {
                        return null;
                    }
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name
                    }
                } catch(e) {
                    console.error(e);
                    return null;
                }
                
              }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({token,session}: any) {
            session.userId = token.sub
            return session;
        }
    }
}