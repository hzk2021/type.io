import React from 'react';
import { Typography } from '@material-tailwind/react';

function Paragraph({words, currentWordIndex, userAnswers, currentLetterIndex, allLetters, onClick = () => {}, hasFocus = false} : {
    words : string[],
    currentWordIndex : number,
    userAnswers : {correct : boolean, word : string}[],
    currentLetterIndex : number,
    allLetters : string[],
    onClick : Function,
    hasFocus : boolean
}) {
    return (
      <>
        <Typography variant="lead" className={`text-justify border-2 p-1 shadow-lg ${!hasFocus && 'blur-sm transition-all duration-200 ease-in'} ${hasFocus && 'blur-none transition-all duration-200 ease-out'}`} onClick={() => onClick()}>
          {words.map((word, wordIndex) => {
              return <span className={`word ${currentWordIndex == wordIndex ? 'font-bold' : ''}
                                      ${userAnswers[wordIndex] !== undefined ? (userAnswers[wordIndex].correct ? 'text-green-500' : 'text-red-500') : ''}`
                                    }  
                          key={wordIndex}>
                                        
                      {word.split("").map((char, charIndex) => {
                          return <span className={`character 
                                                  ${(hasFocus && currentWordIndex == wordIndex && currentLetterIndex === charIndex) ? "relative before:content-[''] before:absolute before:border before:h-1/2 inline-flex items-center before:animate-ping before:delay-1000 before:duration-700 ease-in-out" : ((hasFocus && currentWordIndex == wordIndex && currentLetterIndex >= word.length && charIndex === word.length - 1) ? "relative after:content-[''] after:absolute after:right-0 after:border after:h-1/2 inline-flex items-center after:animate-ping after:delay-1000 after:duration-700 ease-in-out" : '')}
                                                  ${(currentWordIndex == wordIndex && charIndex < currentLetterIndex) ? (allLetters[charIndex] === char ? "text-green-500" : "text-red-500" ): ""}
                                                  `} 
                                      key={charIndex}>{char}</span>;
                      })}
                      {" "}
                      
                    </span>;
          })}
        </Typography>
      </>
    );
}

export default Paragraph;