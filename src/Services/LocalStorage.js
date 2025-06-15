//#region Remember Me with Local Storage

const LOCAL_STORAGE_KEY = 'userCredentials';

export const saveCredentials = (email, password) => {
    const credentials = { email, password };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(credentials));
};

export const getCredentials = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearCredentials = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const hasSavedCredentials = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== null;
};
//#endregion