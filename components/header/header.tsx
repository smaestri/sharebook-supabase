"use client"
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, Image, Button } from "@nextui-org/react";
import SearchInput from "./search-input";
import UserMenuPage from "./user-menu-page";
import { useState } from "react";
import ModalFriend from "./ModalFriend";

export default function Header() {
  console.log('loading header')
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Navbar isBordered maxWidth={'full'}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Image />
            <p className="hidden sm:block font-bold text-inherit">Sharebook</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <SearchInput />
        <UserMenuPage />
      </NavbarContent>
    </Navbar>
  )
}