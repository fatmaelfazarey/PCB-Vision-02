import React, { useState, useEffect, useCallback } from 'react';

const Statistics = () => {

    const [error, setError] = useState(null);
    const [totalPCBs, setTotalPCBs] = useState(0);
    const [passedPCBs, setPassedPCBs] = useState(0);
    const [pendingPCBs, setPendingPCBs] = useState(0);
    const [repairPCBs, setRepairPCBs] = useState(0);

    // const fetchPCBs = useCallback(async () => {
    //     // console.log("fetchPCBs")
    //     setError(null);
    //     try {
    //         const response = await fetch('http://localhost:3002/PCBs', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (!response.ok) {
    //             const errorMessage = await response.text();
    //             throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
    //         }

    //         const data = await response.json();

    //         setTotalPCBs(data.length);
    //         setPassedPCBs(data.filter(pcb => pcb?.Pass_Fail?.Status === 'Pass').length);
    //         setPendingPCBs(data.filter(pcb => pcb?.Pass_Fail?.Status === 'Pending').length);
    //         setRepairPCBs(data.filter(pcb => pcb?.Pass_Fail?.Status === 'Repair').length);
    //     } catch (error) {
    //         console.error('Error fetching PCB history:', error.message);
    //         setError(error.message);
    //     }
    // }, []);

    // console.log("out");

    // useEffect(() => {
    //     // console.log("useEffect");
    //     fetchPCBs();

    //     const intervalId = setInterval(fetchPCBs, 1000);


    //     return () => clearInterval(intervalId); // ==>   لما الcomponent  دي تكون مش شغاله او مش فاتح الصفحه اللي فيها  ال component ديsetInterval عشان توقف ال 
    // }, [fetchPCBs]);

    return (
        <div className="statistics-container">

            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <div className=" flex gap-2  justify-center">
                    <div className="w-full   bg-second px-2 py-4 text-center rounded-xl">
                        <p className="font-bold text-3xl text-main">{totalPCBs}</p>
                        <h3>Total PCBs</h3>

                    </div>

                    <div className="w-full   bg-second px-2 py-4 text-center rounded-xl">
                        <p className="font-bold text-3xl">{passedPCBs}</p>
                        <h3>Passed</h3>

                    </div>

                    <div className="w-full   bg-second px-2 py-4 text-center rounded-xl">
                        <p className="font-bold text-3xl">{pendingPCBs}</p>
                        <h3>Pending</h3>

                    </div>

                    <div className="w-full   bg-second px-2 py-4 text-center rounded-xl">
                        <p className="font-bold text-3xl">{repairPCBs}</p>
                        <h3>Repair</h3>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;