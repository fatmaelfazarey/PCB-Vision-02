import React, { useState, useContext } from 'react';
import { assets, NavBar } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext';

const Header = ({ scrollToSection }) => {
    const { toggleMode, isDarkMode, t, setLanguage, language } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="p-4">
            <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 sm:relative rounded-xl bg-second dark:bg-second-dark">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={assets.logo} className="h-15" alt="Logo" loading="lazy" />
                </a>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-sub-text rounded-lg md:hidden hover:bg-gray-100 outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-expanded={isMenuOpen ? 'true' : 'false'}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={` w-full md:block md:w-auto z-10 md:relative md:top-0 absolute top-20 right-0 ${isMenuOpen ? 'block' : 'hidden '} bg-second dark:bg-second-dark`} id="navbar-menu rounded-xl" >
                    <ul className={`font-medium flex flex-col  md:items-center   p-4 md:p-0 mt-4   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0   `}>
                        {
                            NavBar.map((item, index) => (
                                <li key={index} className='flex flex-col p-4 md:p-0 mt-4   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  "'>
                                    <a href={item.path}
                                        onClick={() => {
                                            isMenuOpen ? toggleMenu() : '';
                                            scrollToSection(item.path);
                                        }}
                                        className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent transition md:hover:text-main md:p-0 dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{t(item.text)}</a>
                                </li>
                            ))
                        }
                        <li key="lang" onClick={() => {
                            const newLanguage = language === 'en' ? 'ar' : 'en';
                            setLanguage(newLanguage);
                        }}
                            className='flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent transition md:hover:text-main dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer'>
                            {t('العربيه')}</li>
                        <li key='mode'
                            onClick={toggleMode}
                            className={`flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ${isDarkMode ? 'rotate-180' : 'rotate-0'}`}>
                            <img src={assets.mode} alt='' width='54' loading="lazy"/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header
