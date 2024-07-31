
export const log = (data: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(data);
    } else {
      // send to server
    }
}