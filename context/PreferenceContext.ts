import { createContext } from "react";

type preferenceDefinition = {
    wordType : "words" | "sentences" | "numbers",
    time : 15 | 30 | 60,
};

interface preferenceContextProps extends preferenceDefinition{
    setPreference : Function
}

const PreferenceContext = createContext<preferenceContextProps | null>(null);


export {PreferenceContext, type preferenceDefinition};