import React, { useState, useEffect } from 'react';

const OperatorHistory = ({ SN, CreatedAt, Pass_Fail, image1, image2, id, userId, Engineer_ID }) => {

    //#region get name == Cancel when connecting to the backend
    const getName = async (id, setName) => {
        const url = `http://localhost:3002/employees/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            if (users) {
                setName(users.Name);
                return users.Name;
            } else {
                alert("Invalid user. Please try again.");
                return null;
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    const [e_name, setE_name] = useState();

    useEffect(() => {
        getName(Engineer_ID, setE_name);
    }, [])

    //#endregion

    return (
        <div
            className={`bg-white dark:bg-black  p-2 sm:p-5 rounded-xl flex flex-row justify-between gap-2 w-full h-full`}>
            <div className='w-full flex flex-col gap-2 sm:gap-4 justify-between relative items-end'>
                <div className={` w-full flex flex-col sm:flex-row justify-between items-center`}>
                    {(image1 || image2) && (
                        <div className={`flex flex-row w-full justify-between flex-wrap items-center gap-2.5`}>
                            <div className='w-fit'>
                                <p className='text-xl text-title'>SN: {SN}</p>
                                <p className='text-xl text-title'>Created at : {CreatedAt}</p>
                                <p className='text-xl text-title'>Status : {Pass_Fail.Status}</p>
                                {/* <p className='text-xl text-title'>{Pass_Fail.Status !== 'Pending' && 'Engineer : ' + id} </p> */}
                                <p className='text-xl text-title'>{Pass_Fail.Status !== 'Pending' && 'Engineer : ' + e_name} </p>
                                <p className='text-xl text-title'>{Pass_Fail.Status !== 'Pending' && 'Modified Time : ' + Pass_Fail.Modified_Time} </p>
                            </div>
                            <div className='images flex flex-row gap-1.5 flex-wrap w-fit justify-end ml-auto'>
                                {image1 && <img src={image1} alt='pcb' className='w-76 ' />}
                                {image2 && <img src={image2} alt='pcb' className='w-76' />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OperatorHistory
