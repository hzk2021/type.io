import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faCrown, faUser, faT } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className='flex w-full mt-2 mb-16 pt-3 gap-5 items-center justify-center flex-wrap sm:justify-between'>
        <div className='flex gap-3 text-lg'>
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
              <span className='hover:text-white'>words</span>
              <span className='hover:text-white'>sentences</span>
              <span className='hover:text-white'>numbers</span>
            </div>

            <div className='flex option self-end gap-2'>
              <span className='hover:text-white'>15</span>
              <span className='hover:text-white'>30</span>
              <span className='hover:text-white'>60</span>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;