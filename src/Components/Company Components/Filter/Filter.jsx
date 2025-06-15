import React, { useState, useRef, useEffect } from 'react';

const Filter = ({ onStatusChange, onSearchChange, initialStatus = 'All' }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    const statusOptions = [
        { value: 'All', label: 'All' },
        { value: 'Pass', label: 'Pass' },
        { value: 'Repair', label: 'Repair' },
        { value: 'Pending', label: 'Pending' },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, onSearchChange]);

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        onStatusChange(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-second dark:bg-second-dark flex flex-row justify-between gap-2 w-full h-full">
            {/* Search input */}
            <div className='flex flex-row bg-white dark:bg-black p-2 rounded-xl gap-2 w-full max-w-80'>
                <svg fill="#777777" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-49 -49 588.00 588.00" xmlSpace="preserve" stroke="#000000" strokeWidth="2.45">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M437.588,202.053C437.588,90.634,344.307,0,229.643,0S21.683,90.634,21.683,202.053s93.296,202.068,207.96,202.068 c43.421,0,83.744-13.04,117.128-35.243L456.982,490l11.335-10.318L359.242,359.809C406.918,322.749,437.588,265.857,437.588,202.053 z M229.643,388.809c-106.23,0-192.647-83.785-192.647-186.756S123.412,15.313,229.643,15.313 c106.216,0,192.633,83.77,192.633,186.741S335.858,388.809,229.643,388.809z"></path>
                    </g>
                </svg>
                <input
                    type='text'
                    placeholder='Search with SN...'
                    className='w-full h-full outline-none border-none caret-main text-[#777777] font-medium'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Status filter dropdown */}
            <div className='w-full max-w-50 bg-white dark:bg-black rounded-xl p-2 relative' ref={dropdownRef}>
                <div
                    className='outline-none border-none text-[#777777] font-medium w-full cursor-pointer flex justify-between items-center'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {selectedStatus}
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="#777777"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>

                {isDropdownOpen && (
                    <div className="absolute left-0 z-10 mt-1 w-full bg-white dark:bg-black rounded-md shadow-lg border border-gray-200">
                        {statusOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`px-4 py-2 text-[#777777] font-medium cursor-pointer hover:bg-main hover:text-white transition-colors ${selectedStatus === option.value ? 'bg-gray-100' : ''
                                    }`}
                                onClick={() => {
                                    handleStatusChange(option.value);
                                    setIsDropdownOpen(false);
                                }
                                }
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Filter;