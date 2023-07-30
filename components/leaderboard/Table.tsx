import { Card, Typography } from '@material-tailwind/react';
import React from 'react';

function Table({jsonHead, jsonBody} : {jsonHead: string[], jsonBody: any[]}) {
  return (
    <div>
        <Card className="w-full h-full overflow-x-scroll border-8 border-gray-700 sm:no-scrollbar">
            <table className="w-full min-w-max table-auto text-left">
                <thead className='[&>tr>th]:bg-gray-400 [&>tr>th>p]:text-black [&>tr>th>p]:font-bold table-auto'>
                <tr>
                    {jsonHead.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                        variant="small"
                        className="font-normal leading-none text-sm font-family-inherit"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody className='mt-2 [&>tr>td]:bg-gray-300'>
                {jsonBody.map((record) => {
                    const classes = "p-4";
        
                    return (
                    <tr key={record.byUserEmail} className="border-t-4 border-gray-700">
                        <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-semibold font-family-inherit opacity-90">
                            {record.byUserEmail}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-bold font-family-inherit opacity-90">
                            <span className='py-1 px-2 rounded bg-black text-white text-xs font-normal'>
                                {record.wpm} wpm
                            </span>
                        </Typography>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>
    </div>
  );
}

export default Table;