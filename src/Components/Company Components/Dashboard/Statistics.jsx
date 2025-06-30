import React, { useState, useEffect, useCallback, useContext } from 'react';
import { dashboard_url } from '../../../Services/EndPoints';
import { AppContext } from '../../../Context/AppContext';


const Statistics = () => {
    // const dashboard_url = `https://0dd2-102-186-145-247.ngrok-free.app`
    const { isDarkMode } = useContext(AppContext);

    return (

        <div className="flex flex-col lg:flex-row gap-5 justify-center ">
            {/* <!-- Left Panel Group --> */}
            <div className="flex flex-col gap-5 w-full  h-[80vh] min-w-[480px]">
                {/* <!-- First Row --> */}
                <div className="flex flex-row  gap-2.5 w-full">
                    {/* Total */}
                    <div className="rounded-2xl overflow-hidden  shadow-md w-full sm:w-[300px] h-[200px]">
                        <iframe className="w-full h-full "
                            src={`${isDarkMode ?
                                `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751212140431&to=1751298540431&timezone=browser&refresh=5s&theme=dark&panelId=3&__feature.dashboardSceneSolo` :
                                `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751208671973&to=1751295071973&timezone=browser&refresh=5s&theme=light&panelId=3&__feature.dashboardSceneSolo`}`}
                            frameBorder="0"></iframe>
                    </div>
                    {/* Defective PCBs */}
                    <div className="rounded-2xl overflow-hidden shadow-md w-full sm:w-[300px] h-[200px]">

                        <iframe className="w-full h-full "
                            src={`${isDarkMode ?
                                `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751212291348&to=1751298691348&timezone=browser&refresh=5s&theme=dark&panelId=2&__feature.dashboardSceneSolo` :
                                `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751208734326&to=1751295134326&timezone=browser&refresh=5s&theme=light&panelId=2&__feature.dashboardSceneSolo`}`}
                            frameBorder="0"></iframe>
                    </div>
                </div>

                {/* <!-- Second Row --> */}

                <div className="flex flex-col  gap-2.5 w-full h-full">
                    {/* Top Three defects */}
                    <div className="rounded-2xl overflow-hidden shadow-md w-full h-full ">

                        <iframe className="w-full h-full "
                            src={`${isDarkMode ?
                                `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751212493181&to=1751298893181&timezone=browser&refresh=5s&panelId=4&__feature.dashboardSceneSolo` :
                                `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751208806139&to=1751295206139&timezone=browser&refresh=5s&theme=light&panelId=4&__feature.dashboardSceneSolo`}`}
                            frameBorder="0"></iframe>
                    </div>
                    {/* pass/fail stutes */}

                </div>
            </div>

            {/* <!-- Right Large Panel == log--> */}
            <div className="flex flex-col gap-5 w-full  h-[80vh] min-w-[480px]">
                <div className="rounded-2xl overflow-hidden shadow-md w-full h-[50%]">

                    <iframe className="w-full h-full "
                        src={`${isDarkMode ?
                            `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751212587769&to=1751298987769&timezone=browser&refresh=5s&panelId=7&__feature.dashboardSceneSolo` :
                            `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751208890146&to=1751295290146&timezone=browser&refresh=5s&theme=light&panelId=7&__feature.dashboardSceneSolo`}`}
                        frameBorder="0"></iframe>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md w-full h-[50%]">
                    <iframe className="w-full h-full "
                        src={`${isDarkMode ?
                            `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751212754828&to=1751299154828&timezone=browser&refresh=5s&panelId=6&__feature.dashboardSceneSolo` :
                            `${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1751208934834&to=1751295334834&timezone=browser&refresh=5s&theme=light&panelId=6&__feature.dashboardSceneSolo`}`}
                        frameBorder="0"></iframe>

                </div>

            </div>
        </div>
    );
};

export default Statistics;