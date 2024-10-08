import ListSalesOrPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

export type BorrowWithBook = any

export default async function Sellings({searchParams}: any) {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  console.log('user retrieved from oauth', (JSON.stringify(user)))
  const email = user?.user_metadata["email"]
    if (error) {
    return <div>Connectez-vous SVP.</div>
  }

  console.log('ventes pour user ' + email)
  console.log('searchParams' + JSON.stringify(searchParams))
  const { data: sales } = await supabase
  .from("borrow")
  .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  .neq("borrower_id", email)
  .in("status", (!searchParams.status || searchParams.status === 'ongoing') ? 
    [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] : 
    [BORROW_STATUS.CANCELLED, BORROW_STATUS.REFUSED, BORROW_STATUS.CLOSED])
  .order('created_at', { ascending: false })

  console.log('sales', JSON.stringify(sales))

  return <ListSalesOrPurchases sales={sales} isPurchase={false} />
 
}