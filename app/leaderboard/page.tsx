'use client';

import StyledButton from '@components/account/StyledButton';
import Table from '@components/leaderboard/Table';
import useFetch from '@hooks/useFetch';
import { Typography } from '@material-tailwind/react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { useRouter} from "next/navigation";
import { useSession } from 'next-auth/react';

function Rankings() {

  const {data : session} = useSession();
  const router = useRouter();
  const records = useFetch<{_id: string, wpm: Number, byUserEmail: string}[]>("GET", `${process.env.NEXT_PUBLIC_URI_IDENTIFIER}/api/leaderboard`);
  const JSON_HEAD = ['User', 'WPM'];


return (
<div className='min-h-[500px] w-full flex flex-col gap-5'>
  <div className='flex flex-wrap justify-center gap-5 md:justify-between'>
    <Typography variant="h3" className="text-clamp">top 100 leaderboard</Typography>
    {!session?.user && <StyledButton size="sm" onClick={() => {router.push('/account');}} className="font-normal text-white rounded-none">tip: sign in to submit your highscore</StyledButton>}
  </div>
  <Table jsonHead={JSON_HEAD} 
         jsonBody={records ? records : []}
  />
</div>);
}

export default Rankings;