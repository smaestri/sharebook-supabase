"use client"

import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"
import { addMessage } from "@/lib/actions"

const Messages = ({ messages, borrowId, isPurchase }: { messages: any, borrowId: any, isPurchase: any }) => {
  const [message, setMessage] = useState<any>();
  let firstUserMessage = ""
  if (messages && messages.length > 0) {
    firstUserMessage = messages[0].user.user_name
  }

  const renderMessages = () => {
    return messages.map((mess: any) => {
      const when = new Date(mess.created_at)
      const dateStr = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(when)
      return (<div className="flex flex-col mb-5">
        <div>{dateStr} par {mess.user.user_name}</div>
        <div className={`${firstUserMessage == mess.user.user_name ? "bg-amber-100" : "bg-blue-100"} rounded-full`}>
          <div className="p-6">
            <div>{mess.message}</div>
          </div>
        </div>
      </div>)
    })

  }
  return (
  <div className="flex flex-col">
    {renderMessages()}
    <form>
      <div>
        <Textarea
          label="Description"
          name="message"
          onValueChange={setMessage}
          placeholder="Message au vendeur"
        />
      </div>
      <div className="mt-5">
        <Button onClick={() => addMessage(borrowId, message, isPurchase)}>Ajouter message</Button>
      </div>
    </form>
  </div>)
}

export default Messages;