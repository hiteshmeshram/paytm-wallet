"use client"
import { Card } from "@repo/ui/card"

export const BalanceCard = ({amount,locked}:{
    amount: number,
    locked: number
})=>{
    return <Card title={"Balance"}>
        
        <div className="flex justify-between py-2">
            <div>Unlocked Balance</div>
            <div>{amount/100} INR</div>
        </div>
        <div className="flex justify-between py-2">
            <div>Locked Balance</div>
            <div>[locked/100] INR</div>
        </div>
        <div className="flex justify-between py-2">
            <div>Total Balance</div>
            <div>{(amount+locked)/100} INR</div>
        </div>
       
    </Card>
}