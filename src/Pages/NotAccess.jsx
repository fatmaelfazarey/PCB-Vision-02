import React from 'react'
import { assets } from '../assets/assets'

const NotAccess = () => {
    return (
        <div className='pl-2.5 pr-2.5  w-full h-lvh flex flex-col justify-center items-center'>
            <h1 className='text-main font-medium' style={{ fontSize: "calc(1.375rem + 1.5vw)" }}>403 - Forbidden</h1>
            <p className='text-[18px] dark:text-white'>You do not have permission to access this page.</p>
            <img src={assets.not_access} alt='not found' className='min-w-60 max-w-[400px] w-full' loading="lazy" />
            <span className='text-second-dark dark:text-second text-base'>
                <a href='/'> <u className='text-main'>Go back to Home Page </u></a>
            </span>
        </div>
    )
}

export default NotAccess
