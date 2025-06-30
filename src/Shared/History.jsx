

import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import HistoryComponent from '../Components/History Component/HistoryComponent';
import OperatorHistory from '../Components/Company Components/Operator Component/OperatorHistory';
import Filter from '../Components/Company Components/Filter/Filter';
import Loading from './Loading/Loading';

const History = ({
    isCompanyLogin,
    role,
    isEngineerView,
    employeeId,
    history,
    userHistoryLoading,
    userHistoryError,
    navigateTo,
    isHistory,
    Line_ID }) => {

    // State for filtering
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [showEmptyState, setShowEmptyState] = useState(false);

    // Filter history based on Line_ID and EngineerView
    const getBaseFilteredHistory = () => {
        if (!history || history.length === 0) return [];

        let baseHistory = [...history];

        // if (isCompanyLogin && isEngineerView) {
        //     // baseHistory = baseHistory.filter(e =>
        //     //     e.Line_ID === Line_ID &&
        //     //     (e.passFailStatus === null || e.passFailStatus === undefined)
        //     // );
        // } else if (role === 'Leader') {
        //     // Leader can see all history
        //     return baseHistory;
        // } else if (Line_ID) {
        //     // baseHistory = baseHistory.filter(e => e.Line_ID === Line_ID);
        // }
        if (role === 'Leader') {
            return baseHistory;
        }

        return baseHistory;
    };

    // Apply search and Status filters
    useEffect(() => {
        const baseHistory = getBaseFilteredHistory();
        let filtered = [];

        if (searchQuery || filterStatus !== 'All') {
            filtered = baseHistory.filter(item => {
                // Status filter
                const matchesStatus = filterStatus === 'All' ||
                    (filterStatus === 'Pending' && item.passFailStatus == null) ||
                    (filterStatus === 'Pass' && item.passFailStatus === true) ||
                    (filterStatus === 'Repair' && item.passFailStatus === false);

                // Search filter
                const matchesSearch = !searchQuery ||
                    (item.sn && item.sn.toLowerCase().includes(searchQuery.toLowerCase()));

                return matchesStatus && matchesSearch;
            });

            setShowEmptyState((searchQuery || filterStatus !== 'All') && filtered.length === 0);
        } else {
            filtered = baseHistory;
            setShowEmptyState(false);
        }

        setFilteredHistory(filtered);
    }, [filterStatus, searchQuery, history, Line_ID, isEngineerView]);

    // Error state
    if (userHistoryError) {
        return (
            <div className='max-w-screen-xl mx-auto flex flex-col w-full h-full'>
                <div className='bg-second dark:bg-second-dark p-2 sm:p-5 w-full'>
                    <div className='bg-white dark:bg-black rounded-xl w-full h-full flex flex-col items-center justify-center gap-2'>
                        <img loading="lazy" src={assets.not_found} alt="empty" title='click to add history' className='w-full' />
                        <p className='p-2 bg-white dark:bg-black'>Error: {userHistoryError}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Determine which history to display
    const displayHistory = filteredHistory.length > 0 ? filteredHistory :
        (searchQuery || filterStatus !== 'All') ? [] : getBaseFilteredHistory();

    return (
        <div className={`max-w-screen-xl mx-auto flex flex-col w-full h-full fixed_direction ${!isEngineerView && 'mt-7'}`}>
            <div className='flex justify-between items-center w-full'>
                <u className='text-lg font-[400] text-sub-text'>
                    {!isEngineerView ? 'History' : 'Defective PCBS'}
                </u>
                <p className='text-lg font-[400] text-sub-text'>
                    {displayHistory?.length} Boards
                </p>
            </div>

            {userHistoryLoading ? (
                <div className='bg-second dark:bg-second-dark p-2 sm:p-5 w-full h-full flex justify-center items-center flex-col'>
                    <div className='p-2 sm:p-5 bg-white dark:bg-black rounded-xl w-full h-full'>
                        <Loading />
                    </div>
                </div>
            ) : (
                <div className='bg-second dark:bg-second-dark p-2 sm:p-5 w-full h-full flex flex-col gap-5 '>
                    {role === 'Leader' && (
                        <Filter
                            onStatusChange={setFilterStatus}
                            onSearchChange={setSearchQuery}
                            initialStatus={filterStatus}
                        />
                    )}

                    {showEmptyState ? (
                        <div className='bg-white dark:bg-black rounded-xl w-full h-full flex flex-col items-center justify-center gap-2'>
                            <img loading="lazy" src={assets.empty} alt="empty" title='No matching results found' />
                            <h1 className='text-sub-text' >No matching results found</h1>
                        </div>
                    ) : displayHistory.length > 0 ? (
                        <div className='w-full flex flex-col gap-5'>
                            {isCompanyLogin ? (
                                <>
                                    {role === 'Operator' && displayHistory.map((item, index) => (
                                        <div key={index}>
                                            <OperatorHistory
                                                image1={item.image1}
                                                image2={item.image2}
                                                id={item.id}
                                                userId={employeeId}
                                                SN={item?.sn || 'N/A'}
                                                CreatedAt={item?.createdAt || ''}
                                                Pass_Fail={item?.defectFlag ? 'Defective' : 'Non-defective'}
                                            />
                                        </div>
                                    ))}

                                    {isEngineerView && displayHistory.map((item, index) => (
                                        <div key={index}>
                                            <HistoryComponent
                                                SN={item?.sn || 'N/A'}
                                                defects={JSON.parse(item.defects)}
                                                Components={JSON.parse(item.components)}
                                                image1={item.image1}
                                                image2={item.image2}
                                                id={item.id}
                                                userId={employeeId}
                                                isCompanyLogin={isCompanyLogin}
                                                isEngineerView={true}
                                                role={role}
                                            />
                                        </div>
                                    ))}

                                    {role === 'Engineer' && !isEngineerView && displayHistory.map((item, index) => (
                                        <div key={index}>
                                            <HistoryComponent
                                                SN={item?.sn || 'N/A'}
                                                defects={item?.defects ? JSON.parse(item.defects) : {}}
                                                Components={item?.components ? JSON.parse(item.components) : {}}
                                                image1={item.image1}
                                                image2={item.image2}
                                                id={item.id}
                                                userId={employeeId}
                                                isCompanyLogin={isCompanyLogin}
                                                role={role}
                                                isEngineerView={false}
                                                Pass_Fail={item.passFailStatus ? 'Pass' : 'Repair'}
                                                passFailTime={item?.modified_Time}
                                            />
                                        </div>
                                    ))}

                                    {role === 'Leader' && displayHistory.map((item, index) => (
                                        <div key={index}>
                                            <HistoryComponent
                                                SN={item?.sn || 'N/A'}
                                                Operator_ID={item?.operator || {}}
                                                Engineer_ID={item?.engineer || {}}
                                                CreatedAt={item?.createdAt || ''}
                                                // Pass_Fail={item?.passFailStatus && item?.defectFlag ? handleStatus(item?.passFailStatus, item?.defectFlag)}
                                                Pass_Fail={item?.passFailStatus === true ? 'Pass' :
                                                    item?.passFailStatus === false ? 'Repair' : 'Pending'}
                                                defects={item?.defects ? JSON.parse(item.defects) : {}}
                                                Components={item?.components ? JSON.parse(item.components) : {}}
                                                image1={item?.image1 || null}
                                                image2={item?.image2 || null}
                                                passFailTime={item?.passFailTime}
                                                id={item?.id}
                                                userId={employeeId}
                                                isCompanyLogin={isCompanyLogin}
                                                role={role}
                                                isEngineerView={false}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                displayHistory.map((items, index) => (
                                    <div key={index}>
                                        <HistoryComponent
                                            defects={items.Defects}
                                            Components={items.Components}
                                            image1={items.image1}
                                            image2={items.image2}
                                            id={items.id}
                                            isCompanyLogin={false}
                                            isHistory={true}
                                            PCB={items}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <Link
                            to={navigateTo}
                            className='bg-white dark:bg-black rounded-xl w-full h-full flex flex-col items-center justify-center gap-2'
                        >
                            <img src={assets.empty} alt="empty" title='click to add history' loading="lazy" />
                            <h1 title='click to add history'>No history...</h1>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default History;