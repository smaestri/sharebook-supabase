"use client"
import { cancelPurchase, closePurchase, refusePurchase, validatePurchase } from "@/lib/actions";
import { Button, Chip, Image } from "@nextui-org/react";
import { useState } from "react";
import ModalRefus from "./ModalRefus";
import { times } from "@/app/purchases/new/page";
import Link from "next/link";
import { BORROW_STATUS } from "@/lib/constants";

export default function PurchaseClient({ sale, isPurchase, buyer, isItem }: { buyer: any, sale: any, isPurchase: boolean, isItem?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const displayTime = (id: any) => {
    return times
      .filter((item: any) => item.id == id)[0].label
  }

  return (
    <>
      <div className="flex flex-col w-[300px] bg-slate-50 rounded-lg ">
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
          <div>
            <p title={sale.user_book.book.title} className="line-clamp-3 font-sans italic">{sale.user_book.book.title}</p>
          </div>
        </div>
        <div>
          {isItem &&
            <div className="flex flex-row gap-2">
              <div>
                <Link className="no-underline hover:underline" href={`/purchase?id=${sale.id}&isPurchase=${isPurchase}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </Link>
              </div>
              <div>
                <Link className="no-underline hover:underline" href={`/purchase?id=${sale.id}&isPurchase=${isPurchase}`}>
                  Détails et messages
                </Link>
              </div>
            </div>}
          <div className="flex flex-row gap-2">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>{isPurchase ? `Propiétaire: ${sale.user_book.user.pseudo}` : `Demandeur: ${buyer.pseudo}`}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              {new Date(sale.rdv_date).toLocaleDateString("fr-FR")} : {displayTime(sale.rdv_time)} {isPurchase ? `${sale.user_book.user.street} ${sale.user_book.user.city} ` : ""}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.902 7.098a3.75 3.75 0 0 1 3.903-.884.75.75 0 1 0 .498-1.415A5.25 5.25 0 0 0 8.005 9.75H7.5a.75.75 0 0 0 0 1.5h.054a5.281 5.281 0 0 0 0 1.5H7.5a.75.75 0 0 0 0 1.5h.505a5.25 5.25 0 0 0 6.494 2.701.75.75 0 1 0-.498-1.415 3.75 3.75 0 0 1-4.252-1.286h3.001a.75.75 0 0 0 0-1.5H9.075a3.77 3.77 0 0 1 0-1.5h3.675a.75.75 0 0 0 0-1.5h-3c.105-.14.221-.274.348-.402Z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            {sale.user_book.price} €</div>
        </div>
        <div className="flex flex-col mt-3 gap-2 items-center">
          {sale.status === BORROW_STATUS.PENDING && isPurchase && <Chip color="warning">Attente de validation du vendeur</Chip>}
          <div className="flex flex-row gap-2">
            {sale.status === BORROW_STATUS.PENDING && !isPurchase && <div><Button isDisabled={!sale.user_book.user.street} onClick={() => validatePurchase(sale.id)}>Accepter</Button></div>}
            {sale.status === BORROW_STATUS.PENDING && !isPurchase && <div><Button onClick={() => setModalOpen(true)}>Refuser</Button></div>}
            {sale.status === BORROW_STATUS.PENDING && isPurchase && <div><Button onClick={() => cancelPurchase(sale.id, sale.user_book.id)}>Annuler ma demande</Button></div>}
            {sale.status === BORROW_STATUS.VALIDATED && isPurchase && <div><Button onClick={() => closePurchase(sale.id, sale.user_book.id)}>Cloturer</Button></div>}
          </div>

          {sale.status === BORROW_STATUS.REFUSED && <Chip color="danger">Demande refusée le {new Date(sale.close_date).toLocaleDateString("fr-FR")}</Chip>}
          {sale.status === BORROW_STATUS.CANCELLED && <Chip color="danger">Demande annulée le {new Date(sale.close_date).toLocaleDateString("fr-FR")}</Chip>}
          {sale.status === BORROW_STATUS.CLOSED && <Chip color="success">Demande cloturée le {new Date(sale.close_date).toLocaleDateString("fr-FR")}</Chip>}
          {sale.status === BORROW_STATUS.VALIDATED && !isPurchase && <Chip color="success">Demande validée, attente du RDV</Chip>}
        </div>
      </div>
      <ModalRefus isOpen={modalOpen} onClose={() => { setModalOpen(false) }} sale={sale} />
    </>

  )
}
