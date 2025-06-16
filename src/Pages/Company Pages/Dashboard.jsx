import React, { lazy, useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import Statistics from '../../Components/Company Components/Dashboard/Statistics';
const EmployeesControlPanel = lazy(() => import('../../Components/Company Components/Dashboard/EmployeesControlPanel'));


const Dashboard = () => {
    const { employeeId, employee } = useContext(CompanyContext);
    return (
        <div className='pl-2.5 pr-2.5'>
            {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            }
            <div className='max-w-screen-xl mx-auto mt-4'>
                <EmployeesControlPanel />
                <Statistics />
            </div>
        </div>
    )
}

export default Dashboard
