'use client';

import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import {Card, Typography} from "@material-tailwind/react";

function Rankings() {

  const [records, setRecords] = useState<{_id: string, wpm: Number, byUserEmail: string}[]>([]);
  const JSON_HEAD = ['User', 'WPM'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch(`${process.env.NEXT_PUBLIC_URI_IDENTIFIER}/api/leaderboard`, {
      method: 'GET',
      next: { revalidate: 60}
      })).json();
      
      setRecords(data);
    };

    fetchData();
  },[]);




return <div className='min-h-[500px] w-full flex flex-col gap-5'>
<h1> Top 100 Leaderboard</h1>
<Card className="w-full h-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {JSON_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const classes = "p-4";
 
            return (
              <tr key={record.byUserEmail}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {record.byUserEmail}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {record.wpm}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>

  </div>
  ;
}

export default Rankings;