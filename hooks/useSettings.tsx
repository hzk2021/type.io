import React, { useEffect, useContext, useRef} from 'react';
import { PreferenceContext } from '@context/PreferenceContext';

function useSettings() {
  const preference = useContext(PreferenceContext);

  let wordType = useRef<"random" | "sentences" | "numbers">("random");
  let wordNum = useRef<number | null>(15);

  function save() {
    window.localStorage.setItem("wordType", preference?.wordType as string);
    window.localStorage.setItem("wordNum", preference?.words.toString() as string);
  }
  useEffect(() => {
    wordType.current = window.localStorage.getItem("wordType") as "random" | "sentences" | "numbers";
    wordNum.current = (typeof window.localStorage.getItem("wordNum")) === "string" ? 
                                    parseInt(window.localStorage.getItem("wordNum")!) : null;

    preference?.setPreference({
      time: preference.time,
      words: wordNum.current ? wordNum.current : preference.words,
      wordType: wordType.current ? wordType.current : preference.wordType
    });

  }, []);

  useEffect(() => {
    save();

  }, [preference?.wordType, preference?.words]);

  return {wordType : wordType.current, wordNum : wordNum.current, save};
}

export default useSettings;