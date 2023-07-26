import React from 'react';
import { Typography } from '@material-tailwind/react';

function Timer({time, className} : {
    time: number,
    className ?: string
}) {
    return (
      <Typography color="indigo" variant="h3" className={className}>{time} seconds</Typography>
    );
}


export default Timer;