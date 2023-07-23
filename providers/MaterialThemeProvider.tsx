'use client';


// @material-tailwind/react'
import {ThemeProvider} from "@material-tailwind/react";

const theme = {
  dialog: {
    defaultProps: {
      animate: {
        unmount: {
        },
        mount: {
          
        }
      },
      className: ""
    },
    styles: {
      base: {
        backdrop: {
          display: "grid",
          placeItems: "",
          position: "fixed",
          top: 0,
          left: 0,
          width: "w-screen",
          height: "h-screen",
          backgroundColor: "bg-transparent",
          backgroundOpacity: "bg-opacity-1",
          backdropFilter: "backdrop-blur-none",
          className: "backdrop-custom"
        },
        container: {
          className: ""
        }
      },
      sizes: {
        xs: {
          width: "w-full",
          minWidth: "",
          maxWidth: "",
        },
      }
    }
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