"use client"

import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"

const ModalUser = ({ isOpen, onClose, userBooks, book }: { isOpen: boolean, onClose: any, userBooks: any, book: any}) => {


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader className="flex flex-col gap-1">Choisir un propriétaire</ModalHeader>
            <ModalBody>
              <p>
                Plusieurs personnes possèdent <i>{book.title}</i>
              </p>
              <p>Merci de choisir: </p>
             <div>
              <table>
                <tr>
                  <td>Pseudo</td>
                   <td>Ville</td>
                  <td>Etat du livre</td>
                  <td>Prix</td>
                  <td></td>
                </tr>
              {userBooks.map((userBook:any) => (
                <tr>
                  <td>{userBook.user.pseudo}</td>
                  <td>{userBook.user.city}</td>
                  <td>{userBook.state}</td>
                  <td>{userBook.price}</td>
                  <td><Link href={`purchases/new?bookId=${userBook.id}`}>
                <Button>Acheter</Button>
              </Link></td>
                </tr>
              ))}
              </table>
              </div>

            </ModalBody>


            {<ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
            </ModalFooter>}
          </form>
        )}
      </ModalContent>
    </Modal>)
}

export default ModalUser;