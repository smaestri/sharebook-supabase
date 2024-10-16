"use client"
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { useSearchParams } from "next/navigation";
import { search } from "@/lib/actions";

export default function SearchInput() {
    const searchParams = useSearchParams();

    const submit = () => {
        //@ts-ignore
        document.forms["term"].submit(); 
    }

    return (<form name="term" action={search}>
        <Input
            name="term"
            classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Chercher livre (titre)"
            size="sm"
            startContent={<SearchIcon onClick={submit} size={18} />}
            type="search"
            defaultValue={searchParams.get("term") || ""}
        /></form>)
}