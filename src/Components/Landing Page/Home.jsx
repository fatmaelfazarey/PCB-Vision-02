import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
const Home = () => {
  const { t } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(true);
  // const isUserLogged = false; // You can change this based on your authentication state

  return (
    <div className="home max-w-screen-xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 items-center " >
      <div className="text-center sm:text-left rtl:sm:text-right">
        <h1 className='text-[1.5rem] sm:text-[2.5rem] rtl:space-x-reverse' style={{ color: "var(--main-color)" }}>
          {t('Discover')}
          <br />
          <b className='text-[1.75rem] sm:text-[3.75rem] w-full '>{t('PCB defects easily')}</b>
          <br />
          {t('and without losses')}
        </h1>
        <p className=' text-sm sm:text-base text-neutral-600'>
          {t('At PCB Vision, we offer advanced solutions powered by AI and machine learning, fully compatible with your production lines to achieve the highest quality standards.')}
        </p>
        <div className="mt-2  mb-1">
          <Link to="/login-company">
            <button
              className={` mr-2 border ${isHovered ? 'bg-main text-white dark:text-black' : 'bg-white dark:bg-black text-main '} bg-main border  font-bold py-2 px-4 rounded opacity-90 transition hover:bg-main hover:opacity-100 `}>
              {t('Login Company')}
            </button>
          </Link>
          <Link to="/sign">
            <button
              className={`mr-2 bg-white dark:bg-black text-main border font-bold py-2 px-4 rounded transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black `}
              onMouseEnter={() => setIsHovered(false)}
              onMouseLeave={() => setIsHovered(true)}>
              {t('Create Account')}
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <img src={assets.home} alt="pcb" loading="lazy" />
      </div>
    </div>


  )
}

export default Home
