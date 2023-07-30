import React from 'react';
import { Button } from '@material-tailwind/react';
import { size } from '@material-tailwind/react/types/components/button';

function StyledButton({onClick, className, size, children} : {onClick : Function, className ?: string, size ?: size, children ?: React.ReactNode}) {
  return (
    <Button size={size || 'md'} className={`p-3 text-black font-family-inherit font-semibold drop-shadow-lg ${className}`} onClick={() => onClick()} color="indigo">{children}</Button>
  );
}

export default StyledButton;