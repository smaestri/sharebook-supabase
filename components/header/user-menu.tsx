"use client"
import React, { useState } from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client';
import { useUserContext } from '@/app/AuthProvider';
import ModalSignin from './ModalSignin';
import ModalFriend from './ModalFriend';

interface AccountProps {
  userId?: string
  avatarSrc?: string
  mail?: string
}

export default function UserMenu({ }: AccountProps) {
  const router = useRouter()
  const supabase = createClient();
  const { userConnected, loading }: any = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFriendOpen, setModalFriendOpen] = useState(false);

  console.log('userConnected in UserMenu', userConnected)

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    router.push("/")
    router.refresh();
  }
  return (
    <>
      {!userConnected && <Button onClick={() => setModalOpen(true)}>
        Connexion
      </Button>}
      {userConnected && <Button onClick={() => setModalFriendOpen(true)}>Voir les livres d'un ami</Button>}

      <ModalSignin isOpen={!!modalOpen} onClose={() => { setModalOpen(false) }} />
      <ModalFriend isOpen={modalFriendOpen} onClose={() => setModalFriendOpen(false)} />

      {userConnected && <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            name={userConnected.email}
            size="md"
            src={""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={
          (key) => {
          if (key === "logout") {
            signOut();
          }
          if (key === "account") {
            router.push("/account")
          }
          if (key === "books") {
            router.push("/my-books")
          }
          if (key === "purchases") {
            router.push("/purchases")
          }
          if (key === "sales") {
            router.push("/sales")
          }
        }}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as {userConnected.email}</p>
          </DropdownItem>
          <DropdownItem key="books">Ma bibiliothèque</DropdownItem>
          <DropdownItem key="purchases">Mes achats</DropdownItem>
          <DropdownItem key="sales">Mes ventes</DropdownItem>
          <DropdownItem key="account">Mon compte</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>}
    </>

  )
}
