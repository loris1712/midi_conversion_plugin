
const tokenKey = 'auth:token'
export const saveAuthToken = (token:string) => {
    window.localStorage.setItem(tokenKey, token);
}

export const getAuthToken = () => {
    return window.localStorage.getItem(tokenKey)
}