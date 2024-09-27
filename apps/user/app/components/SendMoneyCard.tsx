"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/TextInput"
import { useState } from "react"

export const SendMoneyCard = ()=>{
    const [number,setNumber] = useState(0);
    const [amount,setAmount] = useState(0);
    return <div className="w-full  ">
        <TextInput placeholder="Number" label="Number" onChange={(value)=>{
            setNumber(Number(value))
        }}/>
        <TextInput placeholder="Amount" label="Amount" onChange={(value)=>{
            setAmount(Number(value))
        }}/>
        <Button children={"send "} onClick={()=>{

        }}/>
    </div>
}