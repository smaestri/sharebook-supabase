"use client"

import googleIcon from '../../public/google-icon.svg'
import githubIcon from '../../public/github-icon-light.svg'

import Image from "next/image"

import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const ModalSignin = ({ isOpen, onClose }: { isOpen: boolean, onClose: any}) => {
  
  const router = useRouter()
  const supabase = createClient();
  
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader className="flex flex-col gap-1">Choisir un provider</ModalHeader>
            <ModalBody>

              <div className='flex flex-row justify-evenly  items-center'>
                <div>
                <Image
                  src={googleIcon}
                  alt="Google"
                  onClick={signInWithGoogle}
                  className='cursor-pointer '
                />
                </div>
                <div>
                <Image
                  src={githubIcon}
                  alt="Github"
                  onClick={signInWithGithub}
                  className='cursor-pointer '
                />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>)
}

export default ModalSignin;