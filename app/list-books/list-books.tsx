import { ListBooksProps } from "./page";
import { createClient } from "@/utils/supabase/server";
import { BOOK_STATUS } from "@/lib/constants";
import BookPage from "@/components/book-page";
export type BookWithCategoryAndUser = any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  let category: any = null
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return <div>Please connect</div>
  }
  const email = user?.user_metadata["email"]

  console.log('List book of not userId' + user?.id + "with cat " + searchParams.categoryId)


  const { data: books } = await supabase
    .from("book")
    .select("*")
    .eq("category_id", searchParams.categoryId)


  return (<>
    <div className="flex flex-wrap gap-4 mt-5 mb-5">
      {books?.map((book: any) => (
        <BookPage book={book} email={email} />
      ))}
    </div>
  </>
  )
}

