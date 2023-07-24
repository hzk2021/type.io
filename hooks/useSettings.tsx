import React, { useEffect, useContext} from 'react';
import { PreferenceContext } from '@context/PreferenceContext';

function useSettings() {
  const preference = useContext(PreferenceContext);

  useEffect(() => {
    const wordType = window.localStorage.getItem("wordType") as "random" | "sentences" | "numbers";
    const wordNum : number | null = (typeof window.localStorage.getItem("wordNum")) === "string" ? 
                                    parseInt(window.localStorage.getItem("wordNum")!) : null;

    preference?.setPreference({
      time: preference.time,
      words: wordNum ? wordNum : preference.words,
      wordType: wordType ? wordType : preference.wordType
    });

  }, []);

  useEffect(() => {
    window.localStorage.setItem("wordType", preference?.wordType as string);
    window.localStorage.setItem("wordNum", preference?.words.toString() as string);

  }, [preference?.wordType, preference?.words]);

  return (
    <div>useSettings</div>
  );
}

export default useSettings;