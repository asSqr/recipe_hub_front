import { useEffect, useState } from "react";

export const sleep = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export const truncate = (str, length) => {
  if( str.length <= length )
    return str;
  
  return str.slice(0,length) + "…";
};

export const widthThreshold = 750;

// https://ryotarch.com/javascript/react/get-window-size-with-react-hooks/
export const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    if (typeof window === 'undefined')
      return { width: 0, height: 0 };
    
    const { innerWidth: width, innerHeight: height } = window;
    
    return {
      width,
      height
    };
  }
 
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  useEffect(() => {
    if (typeof window === 'undefined')
      return;
    
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  return windowDimensions;
}
