import { PreferenceContext } from '@context/PreferenceContext';
import React, { useContext, useEffect, useState } from 'react';
import { generateNumber, generateSentence, generateWords } from '@utils/generate';

function useLoadText(refetch : boolean) {

  const preferences = useContext(PreferenceContext);
  const [words, setWords] = useState<string[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function load() {
      let tempWords : string[] = [];
      
      switch (preferences?.wordType) {
        case "random":
            tempWords = await generateWords(preferences.words);
            break;
        case "sentences":
            tempWords = await generateSentence(preferences.words);
            break;
        case "numbers":
            tempWords = await generateNumber(preferences.words);
          break;
    
        default:
            break;
        }
        setWords(tempWords);
        setFetched(true);
    }

    load();

    return (() => {
      setWords([]);
      setFetched(false);
    });
  }, [preferences?.wordType, preferences?.words, refetch]);

  return {words, fetched};
}

export default useLoadText;