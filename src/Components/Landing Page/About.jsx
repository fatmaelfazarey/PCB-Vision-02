import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import SectionTitle from '../Section Title/SectionTitle';
import { AppContext } from '../../Context/AppContext';

const About = () => {
    const { t } = useContext(AppContext);
    return (
        <div className={`max-w-screen-xl mx-auto p-4 bg-white dark:bg-black w-full dark:text-white`}>
            <div className='w-full' style={{ direction: 'ltr' }}>
                <SectionTitle title='About ' span='Us' />
            </div>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between">
                <div className="left col-lg-6 col-md-12 text-center md:text-left rtl:md:text-right">
                    <p className='font-[400] text-lg text-sub-text'>{t('PCB Vision is our graduation project from the Faculty of Engineering, Computer and Systems Department at Fayoum University.We are dedicated to developing intelligent solutions for detecting defects in printed circuit boards (PCBs) using artificial intelligence and machine learning technologies.')}
                    </p>
                    <p className='font-light text-2xl mt-4 mb-2'>{t('Our Goal')}</p>
                    <p className='font-[400] text-lg text-sub-text'>
                        {t('Our goal is to help companies enhance production accuracy and efficiency by providing fast and precise defect detection models. Additionally, we support engineers and students working with PCBs by offering a specialized service to identify defects and propose solutions to improve quality and performance.')}
                    </p>
                </div>
                <div className="right col-lg-6 col-md-12 ">
                    <img src={assets.meeting} alt="about" className='w-full' loading="lazy" />
                </div>
            </div>
        </div>
    );
}

export default About
