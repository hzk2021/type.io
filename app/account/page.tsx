'use client';

import React from 'react';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import Image from 'next/image';
import { Button, Typography } from '@material-tailwind/react';

function Account() {

  const {data : session} = useSession();
  
  return (
    <>
    <div className='flex flex-col items-start w-full min-h-[500px] gap-2'>
      <Typography variant="h3">account</Typography>
      {session?.user ?
          <div className='flex flex-col gap-5 items-start'>          
            <div className='flex items-center gap-3'>
                <Image src={session.user?.image!.toString()} alt="profile picture" width={50} height={50}/>
                <div>
                  <p>Email: {session.user?.email}</p>
                  <p>Name: {session.user?.name}</p>
                </div>
            </div>

            <Button onClick={() => signOut()}>Sign Out</Button>

          </div>
          
          :
          <div className=''>
              <Button onClick={() => signIn()}>Sign In</Button>
          </div>
      }
    </div>
    </>
  );
}

export default Account;