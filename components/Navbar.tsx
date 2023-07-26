'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faCrown, faUser, faT } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { PreferenceContext, preferenceDefinition } from '@context/PreferenceContext';
import {
  Dialog,
  DialogHeader,
  Alert
} from "@material-tailwind/react";

// import useSettings from '@hooks/useSettings';

function Navbar() {

  // const {save} = useSettings();
  
  const preference = useContext(PreferenceContext);

  const [open, setOpen] = React.useState(false);
 

  function handleChange(values : preferenceDefinition) {
    preference?.setPreference({
      wordType: values.wordType,
      time: values.time,
      words: values.words
    });

    // save();


    if (!open) setOpen(true);
  }

  useEffect(() => {
    let interval = setTimeout(() => {
      if (open){
        setOpen(false);
        clearTimeout(interval);
      }
    }, 1500);
  }, [open]);

  return (
    <nav className='flex w-full mt-2 mb-16 pt-3 gap-5 items-center justify-center flex-wrap sm:justify-between'>
        <div className='fixed left-0 bottom-0 mx-auto flex w-full justify-center mb-3'>
          <Alert open={open} onClose={() => setOpen(false)} animate={{
            mount: {'y' : '-100'},
            unmount: {'y': '0'},
          }}
          color="gray" 
          className="w-max bg-[#b2b1b9] rounded font-bold shadow-sm flex place-items-center">
              Preference Saved
          </Alert>
        </div>
      
        <div className='flex gap-4 text-4xl sm:text-lg'>
          <Link href="/" title='Play' className='hidden sm:block' tabIndex={-1}>
            <FontAwesomeIcon icon={faT} inverse size='lg'/>ype.io
          </Link>
          <div className='icons flex gap-2'>
              <Link href="/" title='Play' tabIndex={-1}>
                <FontAwesomeIcon icon={faKeyboard} inverse tabIndex={-1}/>
              </Link>
              <Link href="/" title='Leaderboard' tabIndex={-1}>
                <FontAwesomeIcon icon={faCrown} inverse tabIndex={-1}/>
              </Link>
              <Link href="/" title='Account' tabIndex={-1}>
                <FontAwesomeIcon icon={faUser} inverse tabIndex={-1}/>
              </Link>
          </div>
        </div>

        <div className='flex options flex-col cursor-pointer text-lg sm:text-base'>
            <div className='flex option-type gap-2' >
              <button tabIndex={-1} className={`hover:text-white ${preference?.wordType === 'random' ? 'text-white' : ''}`} onClick={() => handleChange({words: preference!.words, time: preference!.time, wordType: "random"})}>random</button>
              <button tabIndex={-1} className={`hover:text-white ${preference?.wordType === 'sentences' ? 'text-white' : ''}`} onClick={() => handleChange({words: preference!.words, time: preference!.time, wordType: "sentences"})}>sentences</button>
              <button tabIndex={-1} className={`hover:text-white ${preference?.wordType === 'numbers' ? 'text-white' : ''}`} onClick={() => handleChange({words: preference!.words, time: preference!.time, wordType: "numbers"})}>numbers</button>
            </div>

            <div className='flex option self-end gap-2'>
              <button tabIndex={-1} className={`hover:text-white ${preference?.words === 15 ? 'text-white' : ''}`} onClick={() => handleChange({words: 15, time: preference!.time, wordType: preference!.wordType})}>15</button>
              <button tabIndex={-1} className={`hover:text-white ${preference?.words === 30 ? 'text-white' : ''}`} onClick={() => handleChange({words: 30, time: preference!.time, wordType: preference!.wordType})}>30</button>
              <button tabIndex={-1} className={`hover:text-white ${preference?.words === 60 ? 'text-white' : ''}`} onClick={() => handleChange({words: 60, time: preference!.time, wordType: preference!.wordType})}>60</button>
              <button tabIndex={-1} className={`hover:text-white ${preference?.words === 120 ? 'text-white' : ''}`} onClick={() => handleChange({words: 120, time: preference!.time, wordType: preference!.wordType})}>120</button>
              <span tabIndex={-1} className={`text-white cursor-default`}>words</span>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;