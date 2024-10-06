import { createClient } from "@/utils/supabase/server";
import SideBar from "./view";
import { useUserContext } from "@/app/AuthProvider";
export default async function SideBarPage({}) {
  const supabase = createClient();


//   select c.name,
//     count(b.category_id)
// from category c
// left join book b on c.id = b.category_id
// group by c.name

  //  const { data: categories, error } = await supabase.
  //   from("category")
  //   .select("name, category(count)");
  //   console.log('categories', categories)

  const { data: categories} = await supabase.rpc('hello_world')

console.log('categories', categories)

  // if (!categories) {
  //   return null;
  // }

 

  return (<SideBar categories={categories}/>)
}
