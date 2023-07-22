'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faCrown, faUser, faT } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { PreferenceContext, preferenceDefinition } from '@context/PreferenceContext';

function Navbar() {
  const preference = useContext(PreferenceContext);

  function handleChange(values : preferenceDefinition) {
    preference?.setPreference({
      wordType: values.wordType,
      time: values.time
    });
  }

  return (
    <nav className='flex w-full mt-2 mb-16 pt-3 gap-5 items-center justify-center flex-wrap sm:justify-between'>
        <div className='flex gap-4 text-lg'>
          <Link href="/" title='Play'>
            <FontAwesomeIcon icon={faT} inverse size='lg'/>ype.io
          </Link>
          <div className='icons flex gap-2'>
              <Link href="/" title='Play'>
                <FontAwesomeIcon icon={faKeyboard} inverse/>
              </Link>
              <Link href="/" title='Leaderboard'>
                <FontAwesomeIcon icon={faCrown} inverse/>
              </Link>
              <Link href="/" title='Account'>
                <FontAwesomeIcon icon={faUser} inverse/>
              </Link>
          </div>
        </div>

        <div className='flex options flex-col text-xs cursor-pointer'>
            <div className='flex option-type gap-2'>
              <span className={`hover:text-white ${preference?.wordType === 'words' ? 'text-white' : ''}`} onClick={() => handleChange({time: preference!.time, wordType: "words"})}>words</span>
              <span className={`hover:text-white ${preference?.wordType === 'sentences' ? 'text-white' : ''}`} onClick={() => handleChange({time: preference!.time, wordType: "sentences"})}>sentences</span>
              <span className={`hover:text-white ${preference?.wordType === 'numbers' ? 'text-white' : ''}`} onClick={() => handleChange({time: preference!.time, wordType: "numbers"})}>numbers</span>
            </div>

            <div className='flex option self-end gap-2'>
              <span className={`hover:text-white ${preference?.time === 15 ? 'text-white' : ''}`} onClick={() => handleChange({time: 15, wordType: preference!.wordType})}>15</span>
              <span className={`hover:text-white ${preference?.time === 30 ? 'text-white' : ''}`} onClick={() => handleChange({time: 30, wordType: preference!.wordType})}>30</span>
              <span className={`hover:text-white ${preference?.time === 60 ? 'text-white' : ''}`} onClick={() => handleChange({time: 60, wordType: preference!.wordType})}>60</span>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;