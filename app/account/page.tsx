import { createClient } from "@/utils/supabase/server";
import UserAccountForm from "@/components/user-account-form";

export default async function Account() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log('user in account', user)
    if (!user?.id) {
      return <div>Please connect</div>
    }
    const email = user?.email;

    if(!email) {
      console.error('email not found')
      return null;
    }

    // fetch user account
    const { data: userInfo } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)

    console.log('userInfo', JSON.stringify(userInfo))
    if(!userInfo || userInfo.length === 0) {
        console.error('failed to retrieve user')
        return
    }

    return (
        <UserAccountForm email={email} userInfo={userInfo[0]} pseudo={userInfo[0].pseudo} />
    )
      
}
