import isDev from 'electron-is-dev';


export const log = (data: any) => {
    if(isDev){
        console.log(data)
    }else {
        // send to server
    }
}