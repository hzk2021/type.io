'use client';

import React, { useState } from 'react';
import {PreferenceContext, preferenceDefinition} from '@context/PreferenceContext';

function PreferenceProvider({children} : {children : React.ReactNode}) {
  const [preference, setPreference] = useState<preferenceDefinition>({
    wordType: 'random',
    time: 60,
    words: 15
  });

  return (
    <PreferenceContext.Provider value={{wordType: preference.wordType, time:preference.time,  words: preference.words, setPreference}}>
        {children}
    </PreferenceContext.Provider>
  );
}

export default PreferenceProvider;