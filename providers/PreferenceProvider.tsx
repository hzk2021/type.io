'use client';

import React, { useState } from 'react';
import {PreferenceContext, preferenceDefinition} from '@context/PreferenceContext';
import useSettings from '@hooks/useSettings';

function PreferenceProvider({children} : {children : React.ReactNode}) {
  const {wordNum, wordType} = useSettings();

  const [preference, setPreference] = useState<preferenceDefinition>({
    wordType: wordType,
    time: 60,
    words: wordNum as number
  });

  return (
    <PreferenceContext.Provider value={{wordType: preference.wordType, time:preference.time,  words: preference.words, setPreference}}>
        {children}
    </PreferenceContext.Provider>
  );
}

export default PreferenceProvider;