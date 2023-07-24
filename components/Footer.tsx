'use client';

import React from 'react';
import { Typography } from '@material-tailwind/react';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="fixed bottom-0 max-w-5xl mx-auto sm:px-16 px-6 flex flex-wrap w-full items-center justify-center gap-y-6 gap-x-12 border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography 
          tabIndex={-1}
          as="a"
          href="https://github.com/hzk2021"
          className="font-normal text-indigo-300 opacity-80 font-inherit text-base">
        <FontAwesomeIcon icon={faCode}/> github
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography 
            tabIndex={-1}
            as="a"
            href="https://www.typeracer.com"
            className="font-normal pointer-cursor text-indigo-300 opacity-80 font-inherit text-base"
          >
            Inspired by TypeRacer
          </Typography>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;