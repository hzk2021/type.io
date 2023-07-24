import React from 'react';

function Word({ text, className, active, correct, currentCharIndex, focus } : {
    text : String,
    className? : String,
    active? : boolean,
    correct? : boolean,
    currentCharIndex : number
    focus : boolean
}) {
  return (
    <span className={`${className}
                    ${(correct !== null && correct !== undefined) ? (correct ? 'text-green-500' : 'text-red-500') : ''}
                    ${(active && (correct === null || correct === undefined))? 'font-bold' : ''}`}>
        {text.split("").map((char, i)=> {
          return currentCharIndex >= text.length ?
                  <span key={i} className={`${( focus && active && (i === text.length - 1) ) ? "relative after:content-[''] after:absolute after:right-0 after:border after:h-1/2 inline-flex items-center after:animate-ping after:delay-1000 after:duration-700 ease-in-out" : "hi"}`}>
                  {char} 
                  </span>
                :
                  <span key={i} className={`${( focus && active && (currentCharIndex === i) ) ? "relative before:content-[''] before:absolute before:border before:h-1/2 inline-flex items-center before:animate-ping before:delay-1000 before:duration-700 ease-in-out" : ""}`}>
                  {char} 
                  </span>;
        })}
        {" "}
    </span>);
}

export default Word;