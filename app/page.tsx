import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TypingGame from '@components/game/TypingGame';

export default async function Game() {  
  return (
    <>
      {

      <section className='game w-full'>
        <TypingGame/>
      </section>

      }
    </>

  );
}

// export default async function Game() {

//   async function dsa() : Promise<boolean>{
//     await new Promise<boolean>((resolve) => setTimeout(() => {
//     resolve(true);
//     }, 3000));

//     return true;
    
//   }

//   const lol = await dsa();

//   return (
//     <>
//     {lol &&
//         <section className='game w-full'>
//           <TypingGame/>
//         </section>
//     }
//     </>
//   );
// }
