"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client"

export async function createOnRampTransaction(amount: number, provider: string) {
    const session =await getServerSession(authOptions);
    const userId = session?.userId;
 
    //this token will evenetually come from banking server since we don't lets assume it 
    const token = Math.random().toString();
    if (!userId) {
        return {
            message: "user not logged in"
        }
    }
    await db.onRampTransaction.create({
        data: {
            amount: amount,
            userId: Number(userId),
            startTime: new Date(),
            status: "processing",
            provider: provider,
            token: token
        }
     })

     return {
        message: "on ramp transaction added"
     }

}