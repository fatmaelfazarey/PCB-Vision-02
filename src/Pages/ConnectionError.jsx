import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'
import { CompanyContext } from '../Context/CompanyContext';
import { Navigate } from 'react-router-dom';

const ConnectionError = () => {
    const { user, userLoading, userError } = useContext(AppContext);
    const { employee, employeeLoading, employeeError } = useContext(CompanyContext);



    if (employee && !employeeLoading && !employeeError) {
        return <Navigate to='/' state={{ path: location.pathname }} />
    } else if (user && !userLoading && !userError) {
        return <Navigate to='/' state={{ path: location.pathname }} />
    }


    return (
        <div className='pl-2.5 pr-2.5  w-full h-lvh flex flex-col justify-center items-center'>
            <h1 className='text-main font-medium' style={{ fontSize: "calc(1.375rem + 1.5vw)" }}>503 Service Unavailable</h1>
            <p className='text-[18px] dark:text-white text-center'>The server is currently unavailable. Please try again later.</p>
            <img src={assets.connectionError} alt='not found' className='min-w-60 max-w-[400px] w-full' loading="lazy" />
            <span className='text-second-dark dark:text-second text-base text-center'>
                Make sure the server is running and your internet connection is stable.
                <a href='/'> <u className='text-main'>Go back to Home Page </u></a>
            </span>
        </div>
    )
}

export default ConnectionError
