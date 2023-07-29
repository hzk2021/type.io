import React from 'react';

function TextInput({ onChange = ()=> {}, onKeyDown = ()=> {}, inputRef, value, className, onFocus = () => {}, onUnfocus = () => {} } : {
    onChange ?: Function,
    onKeyDown ?: Function,
    inputRef : React.RefObject<HTMLInputElement>,
    value : string,
    className ?: string,
    onFocus : Function,
    onUnfocus : Function
}) {
    return (
      <input type="text" onChange={(e) => onChange(e)} ref={inputRef} value={value} onKeyDown={e => onKeyDown(e)} className={className} onFocus={() => {onFocus();}} onBlur={() => {onUnfocus();}} autoFocus/>
    );
}
export default TextInput;