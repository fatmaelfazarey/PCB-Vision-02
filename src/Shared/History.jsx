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

        if (isCompanyLogin && isEngineerView) {
            return history.filter((e) => {
                return e.Line_ID === Line_ID &&
                    ((e.Defects && e.Pass_Fail?.Status === 'Pending') ||
                        (e.Components && e.Pass_Fail?.Status === 'Pending'));
            });
        } else if (role === 'Leader') {
            return history;
        } else if (Line_ID) {
            return history.filter((e) => e.Line_ID === Line_ID);
        }
        return history;
    };

    // Apply search and Status filters
    useEffect(() => {
        const baseHistory = getBaseFilteredHistory();
        let filtered = [];

        if (searchQuery || filterStatus !== 'All') {
            filtered = baseHistory.filter(item => {
                // Status filter
                const matchesStatus = filterStatus === 'All' ||
                    (item.Pass_Fail && item.Pass_Fail.Status === filterStatus);

                // Search filter (check if SN exists and matches query)
                const matchesSearch = !searchQuery ||
                    (item.SN && item.SN.toLowerCase().includes(searchQuery.toLowerCase()));

                return matchesStatus && matchesSearch;
            });

            // Show empty state if we have active filters but no results
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
                    {displayHistory.length} Boards
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
                                    {role === 'Operator' && displayHistory.map((items, index) => (
                                        <div key={index}>
                                            <OperatorHistory
                                                image1={items.image1}
                                                image2={items.image2}
                                                id={items.id}
                                                userId={items.Operator_ID}
                                                SN={items.SN}
                                                CreatedAt={items.CreatedAt}
                                                Pass_Fail={items.Pass_Fail}
                                                Engineer_ID={items.Engineer_ID}
                                            />
                                        </div>
                                    ))}

                                    {isEngineerView && displayHistory.map((items, index) => (
                                        <div key={index}>
                                            <HistoryComponent
                                                SN={items.SN}
                                                defects={items.Defects}
                                                Components={items.Components}
                                                image1={items.image1}
                                                image2={items.image2}
                                                id={items.id}
                                                userId={employeeId}
                                                isCompanyLogin={isCompanyLogin}
                                                isEngineerView={true}
                                                role={role}
                                            />
                                        </div>
                                    ))}

                                    {role === 'Engineer' && !isEngineerView && displayHistory.map((items, index) => (
                                        <div key={index}>
                                            <HistoryComponent
                                                SN={items.SN}
                                                defects={items.Defects}
                                                Components={items.Components}
                                                image1={items.image1}
                                                image2={items.image2}
                                                id={items.id}
                                                userId={employeeId}
                                                isCompanyLogin={isCompanyLogin}
                                                role={role}
                                                isEngineerView={false}
                                                Pass_Fail={items.Pass_Fail}
                                            />
                                        </div>
                                    ))}

                                    {role === 'Leader' && displayHistory.map((items, index) => (
                                        <div key={index}>
                                            <HistoryComponent
                                                SN={items.SN}
                                                Operator_ID={items.Operator_ID}
                                                Engineer_ID={items.Engineer_ID}
                                                CreatedAt={items.CreatedAt}
                                                Pass_Fail={items.Pass_Fail}
                                                defects={items.Defects}
                                                Components={items.Components}
                                                image1={items.image1}
                                                image2={items.image2}
                                                id={items.id}
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