import { createContext } from "react";

type preferenceDefinition = {
    wordType : "random" | "sentences" | "numbers",
    time: number,
    words : number
};

interface preferenceContextProps extends preferenceDefinition{
    setPreference : React.Dispatch<React.SetStateAction<preferenceDefinition>>
}

const PreferenceContext = createContext<preferenceContextProps | null>(null);


export {PreferenceContext, type preferenceDefinition};