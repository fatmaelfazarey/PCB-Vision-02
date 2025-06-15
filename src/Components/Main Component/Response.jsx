import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import DisplayResponseAndHistoryComp from '../../Shared/DisplayResponseAndHistoryComp';
import Loading from '../../Shared/Loading/Loading'


const Response = ({ error, loading, responseData }) => {
    const { t } = useContext(AppContext);

    return (
        <div className='max-w-screen-xl mx-auto bg-second dark:bg-second-dark p-2 sm:p-5 gap-2 fixed_direction'>
            <div className="bg-white dark:bg-black p-2 sm:p-5 rounded-xl flex flex-row justify-between gap-2 ">
                {error ? (
                    <p className='text-red-600 w-full text-center'>{error}</p>
                ) : loading ? (
                    <div className="flex justify-center items-center w-full">
                        <Loading />
                    </div>
                ) : responseData ? (
                    <div className='w-full flex flex-col gap-2 sm:gap-4 justify-between '>
                        <DisplayResponseAndHistoryComp
                            defects={responseData.Defects || {}}
                            image1={responseData.image1}
                            components={responseData.Components || {}}
                            image2={responseData.image2}
                            isCompanyLogin={false}
                        />

                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Response;