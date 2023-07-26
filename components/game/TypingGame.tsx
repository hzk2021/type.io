'use client';

import React, { useEffect, useState } from 'react';
import useLoadText from '@hooks/useLoadText';
import Timer from './Timer';
import Paragraph from './Paragraph';
import TextInput from './TextInput';
import RestartButton from './RestartButton';
import Loading from '@app/loading';
import { PreferenceContext } from '@context/PreferenceContext';
import { useContext, forwardRef } from 'react';
import { useRef } from 'react';
import useTimer from '@hooks/useTimer';
import { Typography } from '@material-tailwind/react';

enum KeyCodes {
  Backspace = 8,
  Spacebar = 32
}

function TypingGame() {

  const preference = useContext(PreferenceContext);

  const [currentWordIndex, setWordIndex] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [allAnswers, setAllAnswers] = useState<{correct : boolean, word : string}[]>([]);
  const [allLetters, setAllLetters] = useState<string[]>([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [focus, setFocus] = useState(false);

  const [refetch, setRefetch] = useState(false);
  const {words, fetched} = useLoadText(refetch);

  function keyDownHandler(e : React.KeyboardEvent) {

    // Checks
    switch (e.keyCode) {
      case KeyCodes.Backspace:
        // Prevents backspacing if current char index is 0
        if (currentLetterIndex === 0) return;
        break;
      default:
        if (!(e.keyCode >= 48 && e.keyCode <= 90)) return;
    
        break;
    }

    if (gameOver) setGameOver(false);

    if (e.keyCode === KeyCodes.Backspace) {

      setAllLetters((l) => {
        const removeOne = l;
        l.pop();
        
        return removeOne;
      });

      return setCurrentLetterIndex((i) => i - 1);
    }
    else {
      if (currentLetterIndex >= words[currentWordIndex].length) {
        return e.preventDefault();
      }

      setAllLetters((l) => {
        return [...l, e.key];
      });
      
      return setCurrentLetterIndex((i) => i + 1);

    }

  }

  function restartGame() {
    setCurrentLetterIndex(0);
    setWordIndex(currentWordIndex + 1);
    setInputValue("");
    setGameOver(true);
    setAllAnswers([]);
    setWordIndex(0);

    setRefetch(!refetch);
    
    if (inputRef.current != null) {
      inputRef.current!.disabled = false;
      inputRef.current!.focus();
    }
  }

  function valueChanged(e : React.ChangeEvent<HTMLInputElement>){

    if (gameOver) return;

    
    if (e.target.value.endsWith(' ')){

      const userWord = e.target.value.trim();
      const currentWord = words[currentWordIndex];

      setAllAnswers(anss => {
        if (userWord === currentWord)
          return [...anss, {correct: true, word: userWord}];

        return [...anss, {correct: false, word: currentWord}];
      });

      setCurrentLetterIndex(0);
      setWordIndex(currentWordIndex + 1);
      setInputValue("");
      
      setAllLetters([]);

      if (allAnswers.length + 1 >= words.length){
        setGameOver(true);
      }

    } else {
      setInputValue(e.target.value);
    }
  }
  const {timeLeft} = useTimer(!gameOver, preference!.time);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameOver && inputRef.current != null) {
      inputRef.current.disabled = true;

      const correct = allAnswers.filter((ans) => ans.correct === true);
      const correctWords = correct.map(c => c.word);
      const correctCharactersCount = correctWords.join("").length; // Doesnt include spaces

      const timeTaken = preference!.time - timeLeft;

      const wpm = ((correctCharactersCount / 5) / (timeTaken / 60));
      setWPM(wpm);

      const accuracy = (correctCharactersCount / (allAnswers.map(c => c.word).join("")).length) * 100;
      setAccuracy(accuracy);

      setAllAnswers([]);
      setWordIndex(0);
    }
  }, [gameOver]);

  useEffect(() => {
    restartGame();
  }, [preference?.wordType, preference?.words]);


  if (!fetched) return <Loading/>;
  return (
    <>
    {
      <div className='flex flex-col w-full gap-3 min-h-full'>
        <Timer time={timeLeft} className="font-thin"/>

        <Paragraph words={words}
                    currentWordIndex={currentWordIndex}
                    userAnswers = {allAnswers}
                    currentLetterIndex = {currentLetterIndex}
                    allLetters = {allLetters}
                    onClick={() => {
                      inputRef.current?.focus();
                    }}
                    hasFocus={focus}/>

        <TextInput onChange={valueChanged} 
                   inputRef={inputRef} 
                   value={inputValue}
                   onKeyDown={keyDownHandler}
                   className="fixed top-[-200px]"
                   onFocus={() => {setFocus(true);}}
                   onUnfocus={() => {setFocus(false);}}/>

        {gameOver && 
          <div className='flex flex-col self-center place-items-center mt-12 gap-2'>

            <div className='text-3xl font-bold flex flex-wrap gap-5 items-center content-center'>
              <span>{wpm.toFixed(0)}
                <span className='text-base'>WPM</span>
              </span>
              |

              <span className='flex flex-col'>
                {accuracy.toFixed(2)}%
                <span className='text-xs self-end'>ACCURACY</span>
              </span>
            </div>

            <RestartButton onClick={() => {
              restartGame();
            }}
            className="cursor-pointer"/>
            
            <Typography variant="h4" className="text-base md:text-2xl">Gameover! Refresh and and type to start/restart!</Typography>

          </div>
        }


      </div>
      
    }


    </>
  );
}

export default TypingGame;