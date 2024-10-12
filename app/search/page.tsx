import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BookPage from "@/components/book-page";

interface SearchProps {
    searchParams: {
        term: string
    }
}

export default async function SearchPage({ searchParams }: SearchProps) {

    const { term } = searchParams;
    console.log('search page with term ' + term)

    if (!term) {
        redirect('/')
    }
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) {
      return <div>Please connect</div>
    }
    const email = user?.user_metadata["email"]
    const { data :books, error } = await supabase.from('book').select().textSearch('title', `${term}`)   

    console.log('books results ', books)

    if (!books || books.length ===0){
        return <div>Aucun résultat pour la recherche "{term}"</div>
    }

    return (<>
        <div className="flex flex-wrap gap-4 mt-5 mb-5">
          {books?.map((book: any) => (
            <BookPage book={book} email={email} />
          ))}
        </div>
      </>
      )


}