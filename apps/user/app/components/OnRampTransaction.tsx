
import { Card } from "@repo/ui/card"

export const OnRampTransaction = ({transactions}:{
    transactions:{
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
})=>{
    if (!transactions) {
        return <Card title={"Recent Transactions"}>
            <div>No Recent Transactions</div>
        </Card>
    }
    return <Card title={"Recent Transactions"}>
        <div>
            {JSON.stringify(transactions)}
            {transactions.map(t=><div className="flex justify-between">
                    <div>
                        <div> Received INR</div>
                        <div> {t.time.toDateString()}</div>
                    </div>
                    <div>
                        +Rs {t.amount/100}
                    </div>
                </div>
            )}
        </div>
    </Card>
}