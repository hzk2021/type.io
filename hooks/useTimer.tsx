import React, { useEffect, useState } from 'react';

function useTimer(start : boolean, maxTime : number) {

    const [timeLeft, setTimeLeft] = useState(maxTime);
    
    useEffect(() => {
        let interval : NodeJS.Timer;

        if (start) {

            interval = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 0) {
                        clearInterval(interval);
                        return t;
                    }

                    return t - 1;
                    
                });
            }, 1000);
        } else {
            setTimeLeft(maxTime);
        }

        return(() => {
            clearInterval(interval);
        });

    }, [start]);

  return {timeLeft};
}

export default useTimer;