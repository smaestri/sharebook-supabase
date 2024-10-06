"use client"
import { cancelPurchase, closePurchase, refusePurchase, validatePurchase } from "@/lib/actions";
import { Button, Chip, Image } from "@nextui-org/react";
import { useState } from "react";
import ModalRefus from "./ModalRefus";
import { times } from "@/app/purchases/new/page";
import Link from "next/link";
import { BORROW_STATUS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default function PurchaseClient({ sale, isPurchase, buyer }: { buyer: any, sale: any, isPurchase: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const displayTime = (id: any) => {
    return times
      .filter((item: any) => item.id == id)[0].label
  }


  const formateDate = () => {
    return new Date(sale.rdv_date).toLocaleDateString("fr-FR")
  }

  return (
    <>
      <div className="flex flex-col w-[300px] bg-slate-50 rounded-lg p-4">
        <div className="flex flex-col items-center">
          <div className="h-[150px]" title={sale.user_book.book.title}>
            <Image
              src={sale.user_book.book.image}
              alt={`${sale.user_book.book.title}`}
              width={100}
              height={100}
            />

            {/* <div>    
              <Link href={`/list-books?userId=${isPurchase ? sale.user_book.user.user_id : buyer.user_id}`}>Voir tous les livres de {isPurchase ? `${sale.user_book.user.user_name}` : `Acheteur: ${buyer}`}</Link>
            </div> */}
          </div>

          <div className="mb-3 mt-2">
            <p title={sale.user_book.book.title} className="line-clamp-3 font-sans italic">{sale.user_book.book.title}</p>
          </div>
          <div className="mb-3">    
              <Link className="no-underline hover:underline" href={`/purchase?id=${sale.id}&isPurchase=${isPurchase}`}>Messages avec {isPurchase ? sale.user_book.user.user_name : buyer.user_name}</Link>
            </div>
        </div>
        <div>
          RDV le {new Date(sale.rdv_date).toLocaleDateString("fr-FR")} de {displayTime(sale.rdv_time)} {isPurchase ? `à ${sale.user_book.user.street} ${sale.user_book.user.city} ` : ""}
        </div>
        <div> Prix: {sale.user_book.price}</div>
        <div className="flex flex-col mt-3 gap-2 items-center">
          {sale.status === BORROW_STATUS.PENDING && isPurchase && <Chip color="warning">Attente de validation du vendeur</Chip>}
          {sale.status === BORROW_STATUS.PENDING && !isPurchase && <div><Button isDisabled={!sale.user_book.user.street} onClick={() => validatePurchase(sale.id)}>Accepter</Button></div>}
          {sale.status === BORROW_STATUS.PENDING && !isPurchase && <div><Button onClick={() => setModalOpen(true)}>Refuser</Button></div>}
          {sale.status === BORROW_STATUS.PENDING && isPurchase && <div><Button onClick={() => cancelPurchase(sale.id, sale.user_book.id)}>Annuler ma demande</Button></div>}
          {sale.status === BORROW_STATUS.REFUSED && <Chip color="danger">Demande refusée le {new Date(sale.close_date).toLocaleDateString("fr-FR")}</Chip>}
          {sale.status === BORROW_STATUS.CANCELLED && <Chip color="danger">Demande annulée le {new Date(sale.close_date).toLocaleDateString("fr-FR")}</Chip>}
          {sale.status === BORROW_STATUS.CLOSED && <Chip color="success">Demande cloturée le {new Date(sale.close_date).toLocaleDateString("fr-FR")}</Chip>}
          {sale.status === BORROW_STATUS.VALIDATED && isPurchase && <div><Button onClick={() => closePurchase(sale.id, sale.user_book.id)}>Cloturer</Button></div>}
          {sale.status === BORROW_STATUS.VALIDATED && !isPurchase && <Chip color="success">Demande validée, attente du RDV</Chip>}


        </div>
      </div>
      <ModalRefus isOpen={modalOpen} onClose={() => { setModalOpen(false) }} sale={sale} />
    </>

  )
}
