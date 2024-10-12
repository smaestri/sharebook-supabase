import Link from "next/link";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import MyBooksForm from "@/components/my-books-form";

export type BookWithCategoryAndUser = any

export default async function MyBooks() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return <div>Please connect</div>
  }
  const email = user?.user_metadata["email"]
  console.log('email', email)

  let { data: userBooks, error } = await supabase
    .from("user_book")
    .select("*, user(*), book(*, category(*))")
    .eq("email", email)
    .eq("deleted", false)
    ;
  console.log('books', userBooks)
  if (error) {
    console.log('error books fetched', error)
  }
  const finalBooks = userBooks?.map(item => ({ id: item.id, place: item.place, state: item.state, price: item.price, bookInfo: item.book, userInfo: item.user }))
  console.log('books fetched', JSON.stringify(finalBooks))

  return (
    <>
      <Link href="my-books/new">
        <Button>Créer un livre</Button>
      </Link>
      <div className="flex justify-center">
        <MyBooksForm email={email} books={finalBooks} />
      </div>
    </>
  )
}


