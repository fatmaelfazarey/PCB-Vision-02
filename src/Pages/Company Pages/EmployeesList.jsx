import React, { lazy, useContext } from 'react'
const EmployeesListComponent = lazy(() => import('../../Components/Company Components/Leader/EmployeesListComponent'));
const SecondHeader = lazy(() => import('../../Shared/SecondHeader'));
import { CompanyContext } from '../../Context/CompanyContext';

const EmployeesList = () => {
    const { employeeId, employee } = useContext(CompanyContext);
    return (
        <div className='pl-2.5 pr-2.5'>
            {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            }
            <EmployeesListComponent />
        </div>
    )
}

export default EmployeesList
