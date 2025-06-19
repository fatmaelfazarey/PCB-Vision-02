import React, { useEffect, useState } from 'react'
import { aboutDefects, componentsNameFormat } from '../assets/assets';
import Zoom from './Content Magnifier/Zoom';
import BoundingBox from './BoundingBox';

const DisplayResponseAndHistoryComp = (props) => {
    let noDefects = false;

    //#region Display PCBS information for each role
    const ShowDefectsInfo = (defects) => {
        const [displayedAbout, setDisplayedAbout] = useState(null);
        if (Object.keys(defects.detections).length === 0) {
            noDefects = true;
            return <p className='text-xl text-title'>Defect Name : no defects</p>
        }

        return Object.entries(defects.statistics).map(([defectName, statistics], idx) => (
            notReapetAboutDefect(getOnlyLetters(defectName)) &&
            (<div key={idx} className='w-[100%] mb-4'>
                <p className='text-xl text-title'>Defect Name : {getOnlyLetters(defectName)}</p>
                <p className='text-xl text-title'>Statistics : {statistics} </p>
                <p
                    className='text-lg font-[400] text-sub-text cursor-pointer'
                    onClick={() => setDisplayedAbout(displayedAbout === defectName ? null : defectName)}
                >
                    About {getOnlyLetters(defectName)}    <svg
                        className={`w-4 h-4 ml-1 transition-transform inline scale-[1.6] ${displayedAbout === defectName ? 'rotate-180' : ''}`}
                        fill="#777777"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </p>
                <p className={`text-sm font-[400] text-title ${displayedAbout === defectName ? 'block' : 'hidden'}`}>
                    {aboutDefects[getOnlyLetters(defectName)]}
                </p>
            </div>)
        ));
    };

    const ShowComponentsInfo = (components) => {
        if (Object.keys(components.statistics).length === 0) {
            noDefects = true;
            return <p className='w-full text-center text-lg font-[400] text-sub-text'>{('No Components')}</p>;
        }

        return <ul className='w-full '> {
            Object.entries(components.statistics).map(([componentsName, statistics], idx) => (
                <li key={idx} className='flex items-center gap-2 text-xl text-title '>
                    <span className="w-2 h-2 border-2 border-sub-text rounded-full flex-shrink-0"></span>
                    <span>{componentsNameFormat[componentsName]} : {statistics}</span>
                </li>))}
        </ul>
    };

    const ShowDefectsInfoPersonal = (defects) => {
        const [displayedAbout, setDisplayedAbout] = useState(null);
        // console.log(defects);
        if (defects && Object.keys(defects.detections).length === 0) {
            noDefects = true;
            return <p className='text-xl text-title'>Defect Name : no defects</p>
        }

        return Object.entries(defects.statistics).map(([defectName, statistics], idx) =>
        (<div key={idx} className='w-[100%] mb-4'>
            <p className='text-xl text-title'>Defect Name : {getOnlyLetters(defectName)}</p>
            <p className='text-xl text-title'>Statistics : {statistics} </p>
            <p
                className='text-lg font-[400] text-sub-text cursor-pointer'
                onClick={() => setDisplayedAbout(displayedAbout === defectName ? null : defectName)}
            >
                About {getOnlyLetters(defectName)}    <svg
                    className={`w-4 h-4 ml-1 transition-transform inline scale-[1.6] ${displayedAbout === defectName ? 'rotate-180' : ''}`}
                    fill="#777777"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </p>
            <p className={`text-sm font-[400] text-title ${displayedAbout === defectName ? 'block' : 'hidden'}`}>
                {aboutDefects[getOnlyLetters(defectName)]}
            </p>
        </div>)
        );
    };

    const ShowDefectsInfoLeader = (defects) => {
        if (Object.keys(defects.detections).length === 0) {
            noDefects = true;
        }
        return <>
            {(Object.keys(defects.detections).length === 0) ? <p className='text-xl text-title'>Defect Name : no defects</p>
                : Object.entries(defects.statistics).map(([defectName, statistics], idx) => (
                    notReapetAboutDefect(getOnlyLetters(defectName)) &&
                    (<div key={idx} className='w-[100%] '>
                        <p className='text-xl text-title'>Defect Name : {getOnlyLetters(defectName)}</p>
                        <p className='text-xl text-title'>Statistics : {statistics} </p>
                    </div>)
                ))}
        </>
    };
    const LeaderHistory = () => {
        return (
            <>
                <p className='text-xl text-title'>Operator : {o_name || props.Operator_ID} </p>
                <p className='text-xl text-title'>Created At : {props.CreatedAt} </p>
                <p className='text-xl text-title'>{!noDefects && 'Status :' + props.Pass_Fail.Status} </p>
                <p className='text-xl text-title'>{!noDefects && 'Engineer :' + e_name || props.Pass_Fail.Modified_By} </p>
                <p className='text-xl text-title'>{!noDefects && 'Modified Time :' + props.Pass_Fail.Modified_Time} </p></>
        )
    }

    const EngineerHistory = () => {
        return (
            <>
                <p className='text-xl text-title'>{!noDefects && 'Status :' + props.Pass_Fail.Status} </p>
                <p className='text-xl text-title'>{!noDefects && 'Modified Time :' + props.Pass_Fail.Modified_Time} </p>
            </>
        )
    }
    //#endregion

    //#region get name Cancel when connecting to backend server
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
    const [o_name, setO_name] = useState();
    useEffect(() => {
        if (props.Engineer_ID || props.Operator_ID) {

            getName(props.Engineer_ID, setE_name);
            getName(props.Operator_ID, setO_name);
        }
    })

    //#endregion

    //#region Dealing with names returned from AI
    const getOnlyLetters = (input) => {
        const lettersArray = input.replace(/[^a-zA-Z]/g, ' ').split(' ');
        const formattedText = lettersArray
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        return formattedText.trim();
    };

    const defectsName = new Set();
    const notReapetAboutDefect = (name) => {
        if (defectsName.has(name)) {
            return false
        } else {
            defectsName.add(name);
            return true;
        }
    }
    //#endregion

    return (
        <>
            <div className={`defects_model w-full flex flex-col lg:flex-row justify-between items-center`}>
                <div className='lg:w-[50%] w-full'>
                    {props.isCompanyLogin ?
                        <>
                            <h1 className='text-xl font-semibold text-title'>SN : {props.SN}</h1>
                            {props.isEngineerView === false && <>
                                {props.role === 'Leader' && LeaderHistory()}
                                {props.role === 'Engineer' && EngineerHistory()}
                            </>
                            }
                            {props.image1 && props.role === 'Leader' && ShowDefectsInfoLeader(props.defects)}
                            {props.image1 && props.role === 'Engineer' && ShowDefectsInfo(props.defects)}
                        </>
                        : <>
                            {props.image1 && ShowDefectsInfoPersonal(props.defects)}
                        </>
                    }
                </div>
                {props.image1 && (
                    <div className='lg:w-[50%] w-full  md:items-end overflow-x-scroll scrollHedden'>
                        <div className={`relative w-[400px] min-w-24 overflow-x-scroll scrollHedden float-none lg:float-right `} id='image1'>
                            {props.magnify ?
                                <div className='w-fit h-fit'>
                                    <Zoom
                                        imageSrc={props.image1}
                                        zoomLevel={2}
                                        spotSize={40}
                                    />
                                </div>
                                :
                                <div className='w-fit h-fit'>
                                    <BoundingBox detections={props.defects.detections} />
                                    <img src={props.image1} alt='pcb' loading="lazy" />
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
            <div className={`components_model  w-full flex flex-col lg:flex-row justify-between `}>
                {props.image2 && (
                    <div className={`flex flex-col w-fit`}>
                        <u className='text-lg font-[400] text-sub-text'>Components</u>
                        <div className=' w-full'>
                            {ShowComponentsInfo(props.components)}
                        </div>
                    </div>
                )}
                {props.image2 && (
                    <div className='lg:w-[50%] w-full  md:items-end overflow-x-scroll scrollHedden'>
                        <div className="relative w-[400px] min-w-24 overflow-x-scroll scrollHedden  float-none lg:float-right" id='image2'>
                            {props.magnify ?
                                <div className='w-fit h-fit'>
                                    <Zoom
                                        imageSrc={props.image2}
                                        zoomLevel={2}
                                        spotSize={40}
                                    />
                                </div>
                                :
                                <div className='w-fit h-fit'>
                                    <BoundingBox detections={props.components.components} />
                                    <img src={props.image2} alt='pcb' loading="lazy" />
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DisplayResponseAndHistoryComp
