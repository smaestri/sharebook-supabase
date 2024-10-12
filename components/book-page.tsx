import { BOOK_STATUS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import BookForm from "./book-form";

export default async function BookPage({book, email} : any) {
    const supabase = createClient();

// pour chaque book, regarder le nombre d'utilisateur qui le possedent
const { data: userBooks } = await supabase
    .from("user_book")
    .select("*, user!inner(*)")
    .eq("book_isbn", book.isbn)
    .neq("email", email)
    .eq("status", BOOK_STATUS.FREE);

    console.log('all user_books',JSON.stringify(userBooks))

    return (<BookForm book={book} userBooks={userBooks} email={email} />)
}