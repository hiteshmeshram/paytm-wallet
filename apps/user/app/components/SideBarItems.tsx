"use client"

import { useRouter } from "next/navigation"

export const SideBarItems = ({title,icon,href}:{
    title: string,
    icon: React.ReactNode,
    href: string
})=>{

    const router = useRouter()
    return <div className="flex mb-3 cursor-pointer" onClick={()=>{
        router.push(href)
    }}>
        <div className="pr-2 ">{icon}</div>
        <div>{title}</div>
    </div>
}
