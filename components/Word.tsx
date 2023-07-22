import React from 'react';

function Word({ text, className, active, correct } : {
    text : String,
    className? : String,
    active? : boolean,
    correct? : boolean,
}) {
  return (
    <span className={`${className} 
                      ${(correct !== null && correct !== undefined) ? (correct ? 'text-green-500' : 'text-red-500') : ''}
                      ${(active && (correct === null || correct === undefined))? 'font-bold' : ''}`}>
        {text} {" "}
    </span>);
}

export default Word;