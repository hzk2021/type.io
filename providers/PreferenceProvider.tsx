'use client';

import React, { useState } from 'react';
import {PreferenceContext, preferenceDefinition} from '@context/PreferenceContext';

function PreferenceProvider({children} : {children : React.ReactNode}) {
  const [preference, setPreference] = useState<preferenceDefinition>({
    wordType: 'words',
    time: 15
  });

  return (
    <PreferenceContext.Provider value={{wordType: preference.wordType, time: preference.time, setPreference}}>
        {children}
    </PreferenceContext.Provider>
  );
}

export default PreferenceProvider;