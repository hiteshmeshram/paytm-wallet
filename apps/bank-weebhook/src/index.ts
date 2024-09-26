import express from "express"
const app = express();
import db from "@repo/db/client"

app.get("/hdfcwebhook",async (req,res)=>{
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),

            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: "success"
                }
            })
        ]);

        res.json({
            message:"captured"
        })

    } catch (e) {
        console.error(e);
        res.status(411).json({message: "Error while processing webhook"})
    }
})

app.listen(3003);