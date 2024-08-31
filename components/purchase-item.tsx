import PurchaseClient from "./purchase-client";
import { createClient } from "@/utils/supabase/server";

export default async function PurchasePage({sale, isPurchase}: {sale: any, isPurchase: boolean}) {
    const supabase = createClient();
    let buyerName
    if(!isPurchase) {
        const { data: buyer } = await supabase
        .from("user")
        .select("user_name")
        .eq("user_id", sale.borrower_id)

        buyerName=buyer![0].user_name
    }
    
    console.log('buyerName', buyerName)

    return(<PurchaseClient sale={sale} isPurchase={isPurchase} buyer={buyerName} />)
    
}
