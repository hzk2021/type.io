'use client';


// @material-tailwind/react'
import {ThemeProvider} from "@material-tailwind/react";

const theme = {
  alert: {
    defaultProps: {
      
    },
  }
};

function MaterialThemeProvider({children} : {children : React.ReactNode}) {
  
    return (
      <ThemeProvider value={theme as any}>
          {children}
      </ThemeProvider>
    );
  }
  
  export default MaterialThemeProvider;