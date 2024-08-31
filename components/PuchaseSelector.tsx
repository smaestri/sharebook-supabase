"use client"
import { Radio, RadioGroup } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PurchaseSelector({ isPurchase}: any) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const status = searchParams.get('status') || "ongoing"
    console.log('status', status)
    return(
        <RadioGroup 
          orientation="horizontal"
          value={status}
          onValueChange={(event: any)=>{
            router.push(`/${isPurchase?"purchases":"sales"}?status=${event}`)
            }
          }>
        <Radio value='ongoing' >En cours</Radio>
        <Radio value='closed' >Clos</Radio>
      </RadioGroup>
    )


}
