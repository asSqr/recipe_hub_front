export const sleep = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export const truncate = (str, length) => {
  if( str.length < length )
    return str;
  
  return str.slice(0,length) + "…";
};