import { createClient } from "@/utils/supabase/server";
import ListSalesOrPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";

export type BorrowWithBook = any

export default async function Purchases({searchParams}: any) {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  const email = user?.user_metadata["email"]

  if (error) {
    return <div>Connectez-vous SVP.</div>
  }
  console.log("searchParams", searchParams)

  const { data: purchases } = await supabase
  .from("borrow")
  .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  .eq("borrower_id", email)
  .in("status", !searchParams.status || searchParams.status === 'ongoing' ? 
    [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] : 
    [BORROW_STATUS.CANCELLED, BORROW_STATUS.CLOSED, BORROW_STATUS.REFUSED])
  .order('created_at', { ascending: false })

  console.log('purchases', JSON.stringify(purchases))
  return <ListSalesOrPurchases sales={purchases} isPurchase={true} />

}