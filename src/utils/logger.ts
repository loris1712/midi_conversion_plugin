
export const log = (...optionalParams: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(optionalParams);
  } else {
    // send to server
  }
};