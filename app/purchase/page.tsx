import Messages from "@/components/Messages";
import PurchaseClient from "@/components/purchase-client";
import { createClient } from "@/utils/supabase/server";

export type BorrowWithBook = any

export default async function PurchasePage({searchParams}: any) {
  const supabase = createClient();
  const {data, error : errConnect} = await supabase.auth.getUser()
  if (errConnect) {
    return <div>Connectez-vous SVP.</div>
  }

  const id = searchParams.id
  const isPurchase = searchParams.isPurchase === "true"?true:false
  console.log('id', id)

  const { data: sales } = await supabase
  .from("borrow")
  .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  .eq("id", id)

  const { data: messages } = await supabase
  .from("messages")
  .select("*, user(*)")
  .eq("borrow_id", id)

  if(!sales || sales.length ==0) {
    return <div>Achat introuvable</div>
  }

  //todo duplication with purchase-item
  let buyer
  if(!isPurchase) {
      const { data: buyers } = await supabase
      .from("user")
      .select("user_name")
      .eq("user_id", sales[0].borrower_id)
      buyer=buyers[0]
  }

  console.log('sales', sales[0].id)

  console.log('messages', messages)


  console.log('isPurchase', isPurchase)

  console.log('buyerNbuyerame', buyer)

  return (
  <div>
    <div className="flex flex-row gap-3">
        <div>
          <PurchaseClient sale={sales[0]} isPurchase={isPurchase} buyer={buyer} />
        </div>
        <div>
          <Messages messages={messages} borrowId={sales[0].id} isPurchase={isPurchase} />
        </div>
    </div>
  </div>)
 
}