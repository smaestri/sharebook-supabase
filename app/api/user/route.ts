import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const supabase = createClient();

    console.log('api user called with email' + email)
    try {
      const { data: userInfos } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
      return Response.json(userInfos)

      } catch (error) {
        console.log('err' + JSON.stringify(error))
      }
      return Response.error();

}