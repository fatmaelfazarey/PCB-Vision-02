import React, { useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import { Link, Navigate, Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';


const Dashboard = ({ children }) => {
    const { employeeId, employee, employeeLoading, employeeError } = useContext(CompanyContext);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === `/Leader/${params.employeeId}` ||
        location.pathname === `/Leader/${params.employeeId}/`) {
        return <Navigate to='statistics' replace state={{ path: location.pathname }} />
    }

    const isActive = (path) => {
        return location.pathname === `/Leader/${params.employeeId}/${path}`;
    }
    // if (!employee && !employeeLoading && employeeError) {
    //     return <Navigate to='/connection-error' state={{ path: location.pathname }} />
    // }
    // const isProfilePage = location.pathname.includes('company-profile');
    // const handleHeaderClick = () => {
    //     if (isProfilePage) {
    //         navigate(`/leader/${employeeId}`);
    //     } else {
    //         navigate(`/leader/${employeeId}/company-profile/${employeeId}`);
    //     }
    // };

    return (
        <div className='pl-2.5 pr-2.5 fixed_direction max-w-screen-xl mx-auto'>
            {employeeLoading && <Loading />}

            {employee && (
                <>
                    <SecondHeader
                        // navigateTo={`/company-profile/${employeeId}`}
                        isCompanyLogin={true}
                        image={employee.Image}
                    // isCompanyLogin={true}
                    // image={employee.Image}
                    // onClick={handleHeaderClick}
                    />
                    <div className="flex flex-row mt-4 overflow-scroll scrollHedden">
                        <nav className='w-fit min-w-32 mr-4 h-full min-h-[80vh] bg-second dark:bg-second-dark rounded-xl overflow-hidden'>
                            <ul className='flex flex-col justify-between gap-4 w-full'>
                                <li className={`${isActive('statistics') ? 'bg-main w-full text-white' : 'text-sub-text'} p-2 `}><Link to='statistics' >Statistics</Link></li>
                                <li className={`${isActive('add-employee') ? 'bg-main w-full text-white' : 'text-sub-text'} p-2 `}><Link to='add-employee' >Add Employee</Link></li>
                                <li className={`${isActive('employees') ? 'bg-main w-ful text-white' : 'text-sub-text'} p-2 `}><Link to='employees' >All Employees</Link></li>
                                <li className={`${isActive(`company-profile/${employeeId}`) ? 'bg-main w-ful text-white' : 'text-sub-text'} p-2 `}><Link to={`company-profile/${employeeId}`} >Profiles</Link></li>
                            </ul>
                        </nav>

                        <div className='w-full h-full max-h-[80vh] overflow-y-scroll rounded-xl min-w-89 scrollHedden'>

                            <Outlet />
                        </div>
                    </div>

                </>
            )}
            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}

        </div>
    )
}

export default Dashboard;