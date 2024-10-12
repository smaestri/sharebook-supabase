"use client"
import FormButton from "@/components/form-button"
import { purchaseBook } from "@/lib/actions"
import { Calendar, Select, SelectItem, Textarea } from "@nextui-org/react"
import { useState } from "react"
import { today, getLocalTimeZone } from "@internationalized/date";

export const times = [
  { id: '10_to_12', label: '10h à midi' },
  { id: '12_to_14', label: '12h à 14h' },
  { id: '14_to_16', label: '14h à 16h' },
  { id: '16_to_18', label: '16h à 18h' },
  { id: '18_to_20', label: '18h à 20h' },
  { id: '20_to_22', label: '20h à 22h' }

]

const Borrow = ({ searchParams }: { searchParams: any }) => {

  const [rdvDate, setRdvDate] = useState<any>({
    day: "",
    month: "",
    year: ""
  })
  const [message, setMessage] = useState<any>();

  const rdv = new Date(rdvDate.year, rdvDate.month - 1, rdvDate.day).toDateString();

  return (
    <form action={purchaseBook.bind(null, searchParams?.bookId as number,
      rdv, message
    )}>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2">

          <div>
            <p>La vente aura lieu au domicile du vendeur. Merci d'indiquer la date et l'heure de rencontre souhaités</p>
          </div>
          <div className="flex justify-center gap-2">
            <Choice timeFieldName="firstTime" setDate={setRdvDate} />
          </div>
          <div>
            <Textarea
              label="Message"
              name="message"
              onValueChange={setMessage}
              placeholder="Message au vendeur"
            />
          </div>
          <div>
            <FormButton>Valider ma demande</FormButton>
          </div>

        </div>
      </div>
    </form>
  )
}


const Choice = ({ setDate, timeFieldName }: { setDate: any, timeFieldName: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <Calendar
        defaultValue={today(getLocalTimeZone())}
        minValue={today(getLocalTimeZone())}
        aria-label="Date (No Selection)"
        onChange={setDate} />
      <Select
        isRequired
        label="Heure souhaitée de rencontre"
        items={times}
        name={timeFieldName}>
        {(time: any) => (
          <SelectItem key={time.id} value={time.id} >{time.label}</SelectItem>
        )}
      </Select>
    </div>)
}



export default Borrow;