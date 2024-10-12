"use client"
import { useUserContext } from "@/app/AuthProvider";
import { saveCity } from "@/lib/actions";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";

export default function UserAccountForm({ email, userInfo, onClose, pseudo }: { email: string, userInfo?: any, onClose?: any, pseudo: string }) {

    const [loading, setLoading] = useState<boolean>();
    const [cities, setCities] = useState<[string] | []>([]);
    const [selectedCity, setSelectedCity] = useState();
    const [street, setStreet] = useState<any>();
    const [formState, action] = useFormState(saveCity.bind(null, email, street, selectedCity), null)
    const { userConnected }: any = useUserContext();

    if (formState === 'OK') {
        if (onClose) {
            onClose();
        }
    }

    useEffect(() => {
        const refreshCitiesFromCp = async () => {
            await refreshCities(userInfo.cp)
        }

        if (userInfo && userInfo.cp) {
            refreshCitiesFromCp()
            console.log('set city', userInfo.city)
            setSelectedCity(userInfo.city)
        }
    }, [userInfo])


    const refreshCities = async (cp: any) => {
        console.log('event.target.value', cp)
        const url = `http://localhost:3000/api/geo?cp=${cp}`

        try {
            setLoading(true)
            const response = await axios.get(url)
            console.log('response 2', response)
            if (response && response.data && response.data.cities) {
                const theCities = response.data.cities.map((item: any) => (item.nomCommune))
                setCities(theCities)
            }
        } catch (error) {
            console.log('err' + JSON.stringify(error))
        } finally {
            setLoading(false)
        }
    }

    const cpChanged = async (event: any) => {
        if (event.target.value.length === 5) {
            refreshCities(event.target.value)
        }
    }
    return (
        <div className="flex max-w-96">
            <div>

            <form action={action}>
                <p>
                    Merci de renseigner votre pseudo et votre adresse précise SVP, qui sera le lieu de la vente avec l'acheteur
                </p>
                <Input name="pseudo" placeholder="Pseudo" isRequired defaultValue={pseudo} />

                <Input name="cp" placeholder="code postal" onChange={cpChanged} defaultValue={userInfo ? userInfo.cp : null} />

                {loading && <div>Loading...</div>}
                {!loading && <Select
                    isRequired
                    selectionMode="single"
                    label="Ville"
                    defaultSelectedKeys={selectedCity ? [selectedCity] : []}
                    onChange={(ev: any) => setSelectedCity(ev.target.value)}
                >
                    {cities.map((city: any) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                </Select>}
                <div>selected city = {selectedCity}</div>
                <Textarea
                    isRequired
                    label="Numéro et nom de la rue"
                    onValueChange={setStreet}
                    defaultValue={userInfo ? userInfo.street : null}
                    placeholder="Numéro et nom de la rue"
                />
                <FormButton>
                    Valider
                </FormButton>
            </form>
            </div>
        </div>
    )
}