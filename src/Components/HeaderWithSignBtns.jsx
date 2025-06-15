import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';

const HeaderWithSignBtns = () => {
    const [isHovered, setIsHovered] = useState(true);
    const { t } = useContext(AppContext);
    return (
        <nav className="p-4">
            <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:p-4 sm:relative rounded-xl bg-second dark:bg-second-dark">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={assets.logo} className="h-15" alt="Logo" />
                </a>

                <div className="mt-2 mb-1">
                    <Link to="/login-company">
                        <button
                            className={`  mr-1 md:mr-2 border text-[11px] md:text-base ${isHovered ? 'bg-main text-white dark:text-black' : 'bg-white dark:bg-black text-main '} bg-main border  font-bold py-2 px-2 md:px-4 rounded opacity-90 transition hover:bg-main hover:opacity-100 `}>
                            {t('Login Company')}
                        </button>
                    </Link>
                    <Link to="/sign">
                        <button
                            className={`mr-1 md:mr-2 bg-white text-[11px] md:text-base dark:bg-black text-main border font-bold py-2 px-2 md:px-4 rounded transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black `}
                            onMouseEnter={() => setIsHovered(false)}
                            onMouseLeave={() => setIsHovered(true)}>
                            {t('Create Account')}
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default HeaderWithSignBtns
