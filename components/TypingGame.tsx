'use client';

import { PreferenceContext } from '@context/PreferenceContext';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {generate} from 'random-words';
import { sentence } from 'txtgen';
import { text } from '@fortawesome/fontawesome-svg-core';
import Word from './Word';

const NUMBER_OF_WORDS = 20;

function TypingGame() {
  const preference = useContext(PreferenceContext);

  const [userInput, setUserInput] = useState('');
  const [texts, setTexts] = useState<Array<String>>([]);
  const [gameOver, setGameOver] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(preference!.time);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState<boolean[]>([]);

  const textInputRef = useRef<HTMLInputElement>(null);

  const generateWords = useCallback(() => {
    return generate(NUMBER_OF_WORDS);
  }, []);

  const generateNumber = useCallback(() => {
    return new Array(NUMBER_OF_WORDS).fill(0).map(() => Math.floor(Math.random() * 9999999).toString());
  }, []);

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
    return new Array(NUMBER_OF_WORDS).fill(0).map((c, i) => char[i]);
  }, []);

  useEffect(() => {
    switch (preference?.wordType) {
      case "words":
        setTexts(generateWords());
        break;
      case "numbers":
        setTexts(generateNumber());
        break;
      default:
        setTexts(generateSentence());
        break;
    };

  }, [preference, generateWords, generateNumber, generateSentence, gameOver]);

  const endGame = useCallback(() => {
    if (!gameOver){
        textInputRef.current!.disabled = true;
        setTimeLeft(0);
        setGameOver(true);
    }
  }, [gameOver]);

  const startGame = useCallback(() => {
    if (gameOver){
        setUserInput('');
        setCurrentWordIndex(0);
        setCorrectWords([]);
        
        setGameOver(false);
        textInputRef.current!.disabled = false;
        textInputRef.current!.focus();

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

  const processInput = useCallback((value : string) => {

    if (value.endsWith(' ')) {

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
    } else setUserInput(value);
  }, [texts, currentWordIndex, endGame]);

  return (
    <>
        <p>
            {timeLeft}
            {
                !gameOver ?
                texts.map((text, index) => {
                    return (
                        <Word key={index}
                              text={text}
                              active={index === currentWordIndex}
                              correct={correctWords[index]}/>
                    );
                }) : <span>
                    wpm {(correctWords.filter(w => w === true).length / preference!.time) * 60} 
                    accuracy: { ((correctWords.filter(w => w === true).length / correctWords.length) * 100).toFixed(2) }%
                    </span>
            }
        </p>

        <input 
            ref={textInputRef}
            type="text"
            value={userInput}
            onChange={e => processInput(e.target.value)}
            disabled={gameOver}
        />

        <button className='rounded-full' onClick={startGame} disabled={!gameOver}>
            Start
        </button>
    </>
  );
}

export default TypingGame;