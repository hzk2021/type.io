'use client';

import React from 'react';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import Image from 'next/image';
import { Button, Typography } from '@material-tailwind/react';
import StyledButton from '@components/account/StyledButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Account() {

  const {data : session} = useSession();
  
  return (
    <>
    <div className='flex flex-col items-start w-full min-h-[500px] gap-2'>
    <Typography variant="h3" className="text-clamp">account</Typography>
      {session?.user ?
          <div className='flex flex-col gap-5 items-start w-full'>          
            <div className='flex items-center gap-3 bg-gray-800 rounded opacity-90 text-white font-normal p-3 w-full'>
                <Image src={session.user?.image!.toString()} alt="profile picture" width={50} height={50}/>
                <div>
                  <p>Email: {session.user?.email}</p>
                  <p>Name: {session.user?.name}</p>
                </div>
            </div>

            <StyledButton onClick={() => signOut()} className="flex gap-2">
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/> Sign Out
              </StyledButton>

          </div>
          
          :
          <div className=''>
              <StyledButton onClick={() => signIn()} className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faGoogle} size="lg"/> Sign In
              </StyledButton>
          </div>
      }
    </div>
    </>
  );
}

export default Account;