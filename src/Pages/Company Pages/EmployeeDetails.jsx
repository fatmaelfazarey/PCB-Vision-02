import React, { lazy, useContext, useLocation } from 'react'
const EmployeeDetailsComponent = lazy(() => import('../../Components/Company Components/Leader/EmployeeDetailsComponent'));
const SecondHeader = lazy(() => import('../../Shared/SecondHeader'));
import { CompanyContext } from '../../Context/CompanyContext';
const EmployeeDetails = () => {
    const { employeeId, employee, role } = useContext(CompanyContext);

    return (
        <div className='pl-2.5 pr-2.5'>
            {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            }
            <EmployeeDetailsComponent />
        </div>
    )
}

export default EmployeeDetails
