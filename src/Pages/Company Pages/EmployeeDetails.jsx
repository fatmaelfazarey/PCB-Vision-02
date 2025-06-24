import React, { lazy, useContext, useLocation } from 'react'
const EmployeeDetailsComponent = lazy(() => import('../../Components/Company Components/Leader/EmployeeDetailsComponent'));
const SecondHeader = lazy(() => import('../../Shared/SecondHeader'));
import { CompanyContext } from '../../Context/CompanyContext';
import { Navigate } from 'react-router-dom';
const EmployeeDetails = () => {
    const { employeeId, employee, role, employeeLoading, employeeError } = useContext(CompanyContext);

    return (
        <div className='pl-2.5 pr-2.5 fixed_direction'>
            {/* {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            } */}
            {
                employee && <EmployeeDetailsComponent />
            }

            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}
        </div>
    )
}

export default EmployeeDetails
