import React, { useState } from 'react';
import { GetCurrentDateTime } from '../../assets/assets';
import { DeletePCB } from '../../Services/SharedServices';
import DisplayResponseAndHistoryComp from '../../Shared/DisplayResponseAndHistoryComp';
import Toast from '../../Shared/Toast/Toast';
import { StatusUpdate } from '../../Services/CompanyServices';

const HistoryComponent = ({
    defects,
    Components,
    image1,
    image2,
    id,
    userId,
    isCompanyLogin,
    isEngineerView,
    SN,
    role,
    Operator_ID,
    Engineer_ID,
    CreatedAt,
    Pass_Fail
}) => {
    const [isHover, setIsHover] = useState(false);
    const [isBtnHovered, setIsBtnHovered] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [useMagnify, setUseMagnify] = useState(false);
    const [hidePCB, setHidePCB] = useState();
    // Toast Utilities
    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const closeToast = () => setShowToast(false);

    // API Actions
    const handleDelete = async (pcbId, isCompanyLogin) => {
        if (!window.confirm('Do you want to delete this PCB?')) return;
        const success = await DeletePCB(pcbId, isCompanyLogin);
        if (success) showToastMessage('PCB deleted successfully. Please reload the page.');
    };

    const updatePassFailStatus = async (pcbId, status) => {
        const passFailUpdate = {
            Engineer_ID: userId,
            Pass_Fail: {
                Modified_By: userId,
                Status: status,
                Modified_Time: GetCurrentDateTime()
            }
        };
        StatusUpdate(pcbId, passFailUpdate);
        // if (StatusUpdate(pcbId, passFailUpdate)) window.location.reload();
    };

    const handlePass = (pcbId) => { updatePassFailStatus(pcbId, 'Pass'); setHidePCB(pcbId) };
    const handleRepair = (pcbId) => { updatePassFailStatus(pcbId, 'Repair'); setHidePCB(pcbId) };

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`bg-white dark:bg-black p-2 sm:p-5 rounded-xl flex flex-row justify-between gap-2 w-full h-full  ${hidePCB ? 'hidden' : ''}`
            }
        >
            <div className="w-full flex flex-col gap-2 sm:gap-4 justify-between items-end relative">
                {showToast && <Toast message={toastMessage} onClose={closeToast} />}

                {isCompanyLogin ? (
                    <DisplayResponseAndHistoryComp
                        defects={defects || {}}
                        image1={image1}
                        components={Components || {}}
                        image2={image2}
                        isCompanyLogin={isCompanyLogin}
                        SN={SN || ''}
                        role={role || ''}
                        Operator_ID={Operator_ID || ''}
                        Engineer_ID={Engineer_ID || ''}
                        CreatedAt={CreatedAt || ''}
                        Pass_Fail={Pass_Fail || {}}
                        isEngineerView={isEngineerView}
                        magnify={useMagnify}
                        hidePCB={hidePCB === id}
                    // className={`${hidePCB === id ? 'hidden' : ''}`}
                    />
                ) : (
                    <DisplayResponseAndHistoryComp
                        defects={defects || {}}
                        image1={image1}
                        components={Components}
                        image2={image2}
                        isCompanyLogin={isCompanyLogin}
                        magnify={useMagnify}
                    />
                )}

                <div className={`flex gap-2 absolute right-[50%] top-[-10px] translate-x[50%] bg-second dark:bg-second-dark cursor-pointer px-4 py-2 rounded-full shadow-xl ${isHover ? 'opacity-100' : 'opacity-0'} `}>
                    {(!isCompanyLogin || (isCompanyLogin && role === 'Leader')) && (
                        <div
                            title="Delete"
                            onClick={() => handleDelete(id, isCompanyLogin)}
                        >
                            <svg fill="#000000" width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z" /><path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z" /><path d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z" /></svg>
                        </div>
                    )}
                    <div
                        title="Magnify"
                        onClick={() => setUseMagnify(!useMagnify)}
                    >
                        {useMagnify ?
                            <svg width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" /></svg>
                            : <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 15.5L19 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>}</div>
                </div>

                {isEngineerView && (
                    <div className="mt-2 flex flex-row mb-1 w-full max-w-[400px] min-w-[260px]">
                        <button
                            onClick={() => handlePass(id)}
                            className={`w-full mr-2 border ${isBtnHovered ? 'bg-main text-white dark:text-black' : 'bg-white dark:bg-black text-main'
                                } font-bold py-2 px-4 rounded opacity-90 transition hover:bg-main hover:opacity-100`}
                        >
                            Pass
                        </button>
                        <button
                            onClick={() => handleRepair(id)}
                            onMouseEnter={() => setIsBtnHovered(false)}
                            onMouseLeave={() => setIsBtnHovered(true)}
                            className="w-full bg-white dark:bg-black text-main border font-bold py-2 px-4 rounded transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black"
                        >
                            Repair
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryComponent;