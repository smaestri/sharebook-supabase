"use client"
import ModalCity from "@/components/ModalCity";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/app/AuthProvider";

export default function Home({ }: any) {
  const { userConnected }: any = useUserContext();
  console.log('userConnected in home', userConnected)
  const [modalOpen, setModalOpen] = useState(false);

  const name = userConnected?.user_metadata["full_name"]
  const email = userConnected?.email
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    console.log('useEffect')

    const fetchUser = async () => {
      console.log('fetchUser')
      setLoading(true)
      try {
        // need to call from client the useconnected to get its pseudo, not poŝsible on server side from /app
        const url = `http://localhost:3000/api/user?email=${email}`
        const response = await axios.get(url)
        const users: any[] = response.data
        console.log('users found', users)
        if ((!users || users.length ===0) || (users.length === 1 && !users[0].pseudo)) {
          console.log('ok')
          setModalOpen(true)
        }else{
          console.log('not')
        }

      } catch (error) {
        console.log('err' + JSON.stringify(error))
      } finally {
        setLoading(false)
      }
    }
    console.log('toto')
    if (!email) {
      console.log('error!!')
      return
    }
    fetchUser()

  }, [email])

  if (!userConnected) {
    return <div>Please login</div>
  }
  return (<>
    <div>Bienvenue</div>
    {userConnected && <ModalCity email={email} isOpen={modalOpen} onClose={() => setModalOpen(false)} pseudo={name} />}
  </>
  )

}
