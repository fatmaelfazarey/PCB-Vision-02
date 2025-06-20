import { createContext, useState, useEffect } from "react";
import { getUserIsLogined, getPCBS, LoginUser } from "../Services/UserService";
import { useTranslation } from 'react-i18next';
// import { AppContextEndPoints } from "../Services/EndPoints";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState(null);
    const [userId, setUserId] = useState(null);

    //#region Language
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    localStorage.removeItem('i18nextLng');
    useEffect(() => {
        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
        window.document.dir = i18n.dir();
    }, [language, i18n]);
    //#endregion


    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'));
            setUserLoading(false);
            getUserIsLogined(localStorage.getItem('userId'), setUser, setUserLoading, setUserError);
        }
    }, [userId]);

    //#region get History
    const [history, setHistory] = useState(null);
    const [userHistoryLoading, setUserHistoryLoading] = useState(false);
    const [userHistoryError, setUserHistoryError] = useState(null);
    useEffect(() => {
        if (userId) {
            // getPCBS(userId, setHistory, setUserHistoryLoading, setUserHistoryError, false);
            getPCBS(userId, setHistory, setUserHistoryLoading, setUserHistoryError);
        }
    }, [userId]);
    //#endregion


    //#region Mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleMode = () => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        } else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    };
    //#endregion

    const value = {
        LoginUser,
        user, userLoading, userError,
        setUser, setUserLoading, setUserError,
        userId,setUserId,
        userHistoryError,
        userHistoryLoading,
        history,
        toggleMode,
        isDarkMode,
        i18n,
        t, language, setLanguage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
