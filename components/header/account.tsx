"use client"
import React, { useState } from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client';
import { useUserContext } from '@/app/AuthProvider';
import Link from 'next/link';

interface AccountProps {
  userId?: string
  avatarSrc?: string
  mail?: string
}

export default function Account({  }: AccountProps) {
  const router = useRouter()
  const supabase = createClient();
  //const [loading, setLoading] = useState(false)

   const {userConnected, loading} : any = useUserContext();

   console.log('userConnected in account', userConnected)
  // console.log('loading in account', loading)

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    router.push("/")
    router.refresh();
  }

  const signInWithGithub = async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    router.push("/")
    router.refresh();
  }
  const signInWithGoogle = async () => {
    console.log('call google toto')
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    router.push("/")
    router.refresh();
  }

  // if (loading) {
  //   return <div>Laoding ...</div>
  // }
console.log('userConnected', userConnected)
  return (
    <><Link href="/my-books">Mes livres</Link><Link href="/purchases">Mes achats</Link><Link href="/sales">Mes ventes</Link>
      {!userConnected &&  <Button onClick={signInWithGoogle}>Sign In with Google</Button>}

      {!userConnected &&  <Button onClick={signInWithGithub}>Sign In with github</Button>}

      {userConnected && <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            name={userConnected.email}
            size="sm"
            src={""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => {
          if (key === "logout") {
            signOut();
          }
        }}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as {userConnected.email}</p>
          </DropdownItem>
          <DropdownItem >Mon compte</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>}
    </>

  )
}
