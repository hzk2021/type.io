import TypingGame from '@components/TypingGame';
import Image from 'next/image';
import Link from 'next/link';

export default function Game() {

  return (
    <>
      <section className='game w-full'>
        <TypingGame/>
      </section>
    </>
  );
}
