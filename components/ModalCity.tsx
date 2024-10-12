"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import FormButton from "./form-button"
import UserAccountForm from "./user-account-form"

const ModalCity = ({ email,isOpen, onClose, pseudo }: { email: string, isOpen: boolean, onClose: any, pseudo: string }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Indiquer une ville</ModalHeader>
            <ModalBody>
              <UserAccountForm email={email} onClose={onClose} pseudo={pseudo} />
            </ModalBody>
            {<ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              
            </ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>)
}

export default ModalCity;