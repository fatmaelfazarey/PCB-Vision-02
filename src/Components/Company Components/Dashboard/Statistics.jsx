import React, { useState, useEffect, useCallback } from 'react';

const Statistics = () => {
    const dashboard_url = `https://0dd2-102-186-145-247.ngrok-free.app`

    return (

        <div className="flex flex-col lg:flex-row gap-5 justify-center max-w-7xl mx-auto">
            {/* <!-- Left Panel Group --> */}
            <div className="flex flex-col gap-5 w-full lg:w-auto">
                {/* <!-- First Row --> */}
                <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                    <div className="rounded-2xl overflow-hidden shadow-md w-full sm:w-[300px] h-[200px]">
                        <iframe className="w-full h-full border border-gray-200"
                            src={`${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1750221608731&to=1750308008731&timezone=browser&refresh=5s&theme=light&panelId=3&__feature.dashboardSceneSolo`}
                            frameBorder="0"></iframe>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md w-full sm:w-[300px] h-[200px]">
                        <iframe className="w-full h-full border border-gray-200"
                            src={`${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1750221673623&to=1750308073623&timezone=browser&refresh=5s&theme=light&panelId=2&__feature.dashboardSceneSolo`}
                            frameBorder="0"></iframe>
                    </div>
                </div>

                {/* <!-- Second Row --> */}
                <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                    <div className="rounded-2xl overflow-hidden shadow-md w-full sm:w-[300px] h-[200px]">
                        <iframe className="w-full h-full border border-gray-200"
                            src={`${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1750430182369&to=1750516582369&timezone=browser&refresh=5s&theme=light&panelId=4&__feature.dashboardSceneSolo`}
                            frameBorder="0"></iframe>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md w-full sm:w-[300px] h-[200px]">
                        <iframe className="w-full h-full border border-gray-200"
                            src={`${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1750221713595&to=1750308113595&timezone=browser&refresh=5s&theme=light&panelId=5&__feature.dashboardSceneSolo`}
                            frameBorder="0"></iframe>
                    </div>
                </div>
            </div>

            {/* <!-- Right Large Panel --> */}
            <div className="rounded-2xl overflow-hidden shadow-md w-full lg:w-[600px] h-[700px]">
                <iframe className="w-full h-full border border-gray-200"
                    src={`${dashboard_url}/d-solo/eej6p4tne5qm8d/pcb-vision?orgId=1&from=1750221588731&to=1750307988731&timezone=browser&refresh=5s&theme=light&panelId=6&__feature.dashboardSceneSolo`}
                    frameBorder="0"></iframe>
            </div>
        </div>
    );
};

export default Statistics;