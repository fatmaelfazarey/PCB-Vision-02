import React, { useContext } from 'react'
// import { assets, NavBar } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext'
const Footer = ({ scrollToSection }) => {
    const { t } = useContext(AppContext);
    return (
        <div className='footer mt-5 h-fit'>
            <div className={` max-w-screen-xl mx-auto flex flex-col relative z-50 `}>
                {/* <div className='flex flex-row justify-between gap-3 flex-wrap pt-6 pb-6 pl-4 pr-4'>
                    <div>
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-2.5">
                            <img src={assets.logo} className="h-15" alt="Logo" loading="lazy"/>
                        </a>
                        <p className='max-w-[400px]  text-lg font-[400] text-sub-text'>{t('Detect defects in PCBs, highlight them in the image, and help companies improve production accuracy on their lines')}</p>
                    </div>
                    <ul className={` flex flex-col`}>
                        {
                            NavBar.map((item, index) => (
                                <li key={index} className=' p-.5 cursor-pointer'>
                                    <a href={item.path}
                                        onClick={() => {
                                            scrollToSection(item.path);
                                        }}
                                        className=" cursor-pointer text-lg font-[400] text-sub-text hover:text-main "  >{t(item.text)}</a>
                                </li>
                            ))
                        }
                    </ul>
                    <div className='flex gap-1 '>
                        <div className='p-2 bg-second h-fit'>
                            <img src={assets.pcb} className='w-40 ' loading="lazy"/>
                        </div>
                        <div className='p-2 bg-second h-fit'>
                            <img src={assets.pcb2} className='w-40' loading="lazy"/>
                        </div>
                    </div>
                </div> */}
                <div className='flex flex-col  justify-center items-center text-center text-base font-[400] text-sub-text'>
                    <hr className='w-full' />
                    <p className='pt-3 pb-3 pl-2 pr-2'>{t('Copyright')} &copy; {t('2025 PCB Vision team - All Right Reserved')}</p>
                </div>
            </div>

        </div>
    )
}

export default Footer
