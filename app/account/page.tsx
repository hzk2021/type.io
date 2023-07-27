'use client';

import React from 'react';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@material-tailwind/react';

function Account() {

  const {data : session} = useSession();
  
  return (
    <>
    {session?.user ?
        <div>
            <Image src={session?.user?.image!.toString()} alt="profile picture" width={50} height={50}/>
            Name: {session?.user?.name}
            Email: {session?.user?.email}
            <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
        :
        <div>
            <Button onClick={() => signIn()}>Sign In</Button>
        </div>
    }
    </>
  );
}

export default Account;