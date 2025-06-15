import React, { useContext } from 'react'
import styles from './SectionTitle.module.css';
import { AppContext } from '../../Context/AppContext';

const SectionTitle = (props) => {
    const { t } = useContext(AppContext);
    return (
        <div className={`${styles.parent} w-fit m-auto text-[#2C2C2C] dark:text-[#B0B0B0] mt-[20px] mb-[20px] `}>
            <p className={`${styles.title} font-semibold text-3xl md:text-5xl w-fit m-auto text-center `}>{t(props.title)}<span className={`${styles.span} font-light  `}>{t(props.span)}</span></p>
        </div>
    )
}

export default SectionTitle
