import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransaction } from "../../components/OnRampTransaction";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client"

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findFirst({
        where: {
            userId: session?.user?.id
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

async function getTransactions() {
    const session = await getServerSession(authOptions);
    
    const transactions = await db.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id
        }
    });
    return transactions.map(t=>{
        return {
            time: t.startTime,
            status: t.status,
            amount: t.amount,
            provider: t.provider
        }
    })
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getTransactions();
    return <div className="mx-4">
        <div className="text-4xl pt-8 mb-8 font-bold px-2">Transfer</div>
        <div className="grid grid-cols-2 gap-4 ">
            <div className="">
                <AddMoneyCard/>
            </div>
            <div className="">
                
                    <BalanceCard amount={balance.amount} locked={balance.locked}/>
                
                <div>
                    <OnRampTransaction transactions={transactions}/>
                </div>
            </div>

        </div>
    </div>
}