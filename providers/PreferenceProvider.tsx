'use client';

import React, { useState } from 'react';
import {PreferenceContext, preferenceDefinition} from '@context/PreferenceContext';
import useSettings from '@hooks/useSettings';

function PreferenceProvider({children} : {children : React.ReactNode}) {
  const {wordNum, wordType} = useSettings();

  const [preference, setPreference] = useState<preferenceDefinition>({
    wordType: wordType ? wordType : "random",
    time: 60,
    words: wordNum ? parseInt(wordNum) as number : 15
  });

  return (
    <PreferenceContext.Provider value={{wordType: preference.wordType, time:preference.time,  words: preference.words, setPreference}}>
        {children}
    </PreferenceContext.Provider>
  );
}

export default PreferenceProvider;