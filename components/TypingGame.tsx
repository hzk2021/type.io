'use client';

import { PreferenceContext } from '@context/PreferenceContext';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {generate} from 'random-words';
import { sentence } from 'txtgen';
import { text } from '@fortawesome/fontawesome-svg-core';
import Word from './Word';
import { Typography} from '@material-tailwind/react';

function TypingGame() {
  const preference = useContext(PreferenceContext);

  const [userInput, setUserInput] = useState('');
  const [texts, setTexts] = useState<Array<String>>([]);
  const [gameOver, setGameOver] = useState(true);
  const [wpm, setWPM] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(preference!.time);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState<boolean[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const textInputRef = useRef<HTMLInputElement>(null);

  const generateWords = useCallback(() => {
    return generate(preference!.words);
  }, [preference]);

  const generateNumber = useCallback(() => {
    return new Array(preference!.words).fill(0).map(() => Math.floor(Math.random() * 9999999).toString());
  }, [preference]);

  const generateSentence = useCallback(() => {
    const sen = sentence().concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`)
                          .concat(` ${sentence()}`);
    const char = sen.split(" ");
    return new Array(preference!.words).fill(0).map((c, i) => char[i]);
  }, [preference]);

  const endGame = useCallback(() => {
    if (!gameOver){
        textInputRef.current!.disabled = true;
        setGameOver(true);
        setTimeLeft(0);
    }
  }, [gameOver, preference, correctWords, timeLeft]);

  const startGame = useCallback(() => {
    if (gameOver){
        setUserInput('');
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setCorrectWords([]);
        setWPM(0);
        
        setGameOver(false);

        setTimeout(() => {
          textInputRef.current!.disabled = false;
          textInputRef.current!.focus();

        },10);

        const interval = setInterval(() => {

            setTimeLeft(t => {
                if (t <= 0) {
                    clearInterval(interval);
                    setGameOver(true);

                    endGame();

                    return preference!.time;
                }
                return t - 1;
            });

        }, 1000);
    }
  }, [gameOver, endGame, preference]);

  const processCurChar = useCallback((keyCode: number, e : React.KeyboardEvent<HTMLInputElement>) => {
    // checks

    switch (keyCode) {
      case 8:
        // Prevents backspacing if current char index is 0
        if (currentCharIndex === 0) return;
        break;
      default:
        if (!(keyCode >= 48 && keyCode <= 90)) return;
        break;
    }

    if (keyCode === 8) return setCurrentCharIndex((i) => i - 1);
    else {
      if (currentCharIndex >= texts[currentWordIndex].length) {
        return e.preventDefault();
      }

      return setCurrentCharIndex((i) => i + 1);

    };

  }, [currentCharIndex, texts, currentWordIndex]);

  const processInput = useCallback((value : string) => {

    let wpm = Math.round(correctWords.filter(w => w === true).length / ((preference!.time - timeLeft) / 60));
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    setWPM(wpm);
    
    if (value.endsWith(' ')) {

        setCurrentCharIndex(0);

        // check if user has finished typing the words
        if (currentWordIndex >= texts.length - 1){
            endGame();
        }

        // player finished typing this word
        const trimmedWord = value.trim();

        if (trimmedWord === texts[currentWordIndex]) {
            console.log("correct");

            setCorrectWords(booleans => {
                return [...booleans, true];
            });
        } else {
            console.log("incorrect");

            setCorrectWords(booleans => {
                return [...booleans, false];
            });
        }

        setCurrentWordIndex(ci => ci + 1);
        setUserInput('');

        setCurrentCharIndex(0);
    } else setUserInput(value);
  }, [texts, currentWordIndex, endGame]);

  useEffect(() => {

    if (gameOver) {
      switch (preference?.wordType) {
        case "random":
          setTexts(generateWords());
          break;
        case "numbers":
          setTexts(generateNumber());
          break;
        default:
          setTexts(generateSentence());
          break;
      };
      // setTimeLeft(preference!.time);
    }
  }, [preference, gameOver]);

  return (
    <>
      <div>

        {!gameOver && <Typography variant="h2" color="indigo" className="font-normal">{timeLeft}</Typography>}
        <Typography variant="lead" onClick={() => textInputRef.current?.focus()} 
        className={`cursor-default text-base md:text-lg transition-all delay-0 duration-200 ease-in-out font-thin ${(typeof window !== "undefined") ? (
                                                                        !(document.activeElement === textInputRef.current)
                                                                        ? 'blur-sm'
                                                                        : '' ) : null}`
                       }>
            {
                !gameOver ?
                texts.map((text, index) => {
                    return (
                        <Word key={index}
                              text={text}
                              active={index === currentWordIndex}
                              currentCharIndex={currentCharIndex}
                              correct={correctWords[index]}/>
                    );
                }) : ''
            }
        </Typography>
        
        {
          gameOver && texts ?
          <span>
            wpm {wpm} 
            accuracy: { ((correctWords.filter(w => w === true).length / correctWords.length) * 100).toFixed(2) }%
          </span> : null
        }
        
      </div>
        
        <input 
            ref={textInputRef}
            type="text"
            value={userInput}
            onChange={e => processInput(e.target.value)}
            onKeyDown={e => processCurChar(e.keyCode, e)}
            disabled={gameOver}
            className= {`${gameOver ? `invisible` : 'visible'} opacity-0 select-none fixed -top-200`}
            autoFocus={true}
        />

        {gameOver && <button className='rounded-full' onClick={() => startGame()} disabled={!gameOver} tabIndex={-1}>
            Start
        </button>}
    </>
  );
}

export default TypingGame;