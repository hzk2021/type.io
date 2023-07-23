import { createContext } from "react";

type preferenceDefinition = {
    wordType : "words" | "sentences" | "numbers",
    time : number
};

interface preferenceContextProps extends preferenceDefinition{
    setPreference : React.Dispatch<React.SetStateAction<preferenceDefinition>>
}

const PreferenceContext = createContext<preferenceContextProps | null>(null);


export {PreferenceContext, type preferenceDefinition};