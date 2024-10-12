"use client"
import Image from "next/image"
import { DeleteBook } from "./delete-book-button";
import { useState } from "react";
import { Button, Link } from "@nextui-org/react";

interface MyBooksFormProps {
  books: any
  email?: string
  askCity?: boolean

}

export default function MyBooksForm({ books, email, askCity }: MyBooksFormProps) {

  const [modalOpen, setModalOpen] = useState(askCity);

  // const [modalBorrowOpen, setModalBorrowOpen] = useState(false);

  console.log('books', books)
  return (<>

    <div className="flex flex-wrap gap-4 mt-5 mb-5">
      {books?.map((userBook: any) => (
        <div
          key={userBook.bookInfo.id}
          className="flex flex-col w-[300px]"
        >
          <div className="flex flex-col items-center">
            <div className="h-[150px] mb-3">
              <Image
                src={userBook.bookInfo.image}
                alt={`${userBook.bookInfo.title}`}
                width={100}
                height={100}
              />
            </div>
            <div className="h-[65px] mb-5">
              <p title={userBook.bookInfo.title} className="line-clamp-3 font-sans">{userBook.bookInfo.title} - {userBook.bookInfo.author}</p>
            </div>
          </div>
          <div>Propriétaire: {userBook.userInfo.pseudo}</div>
          <div>Lieu de retrait: {userBook.userInfo.city} ({userBook.userInfo.cp})</div>
          <div>Etat: {userBook.state}</div>
          <div>Prix: {userBook.price}</div>
          <div className="flex flex-col items-center mt-2">
            {email && userBook.userInfo.email !== email &&
              <Link href={`purchases/new?bookId=${userBook.id}`}>
                <Button>Acheter</Button>
              </Link>}
          </div>
          <div className="">
            {email && userBook.userInfo.email === email &&
              <div className="flex flex-col items-center gap-2">
                <div>
                  <DeleteBook userBookId={userBook.id} />
                </div>
              </div>
            }
          </div>
          <div>
            {!email && <div>Connectez-vous pour emprunter!{email}</div>}
          </div>
        </div>
      ))}
    </div>
  </>)

}







