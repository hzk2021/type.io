import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-tailwind/react';

function RestartButton({onClick, className} : {onClick : Function, className?: string}) {
    return (
      <div>
        <Button variant='text' onClick={() => onClick()} className={className} color="indigo">
          <FontAwesomeIcon icon={faArrowsRotate} size="xl"/>
        </Button>
      </div>
    );
}


export default RestartButton;