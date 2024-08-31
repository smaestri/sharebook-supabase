import { BorrowWithBook } from "@/app/sales/page";
import PurchasePage from "./purchase-item";
import PurchaseSelector from "./PuchaseSelector";

export default function ListSalesOrPurchases({ sales, isPurchase }: any) {
  console.log('sales', sales)

  return (
    <div>
      <PurchaseSelector isPurchase={isPurchase} />
      <div className="flex flex-wrap gap-4 mt-5 mb-5">
        {sales?.map((sale: BorrowWithBook) => (
          <PurchasePage sale={sale} isPurchase={isPurchase} />
        ))}
      </div>
      {sales.length === 0 && <div>{isPurchase?"Aucun achat" : "Aucune vente"}</div>}
    </div>
  )
}