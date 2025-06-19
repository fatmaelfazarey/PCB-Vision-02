import React, { lazy, useContext } from 'react'
const EmployeesListComponent = lazy(() => import('../../Components/Company Components/Leader/EmployeesListComponent'));
const SecondHeader = lazy(() => import('../../Shared/SecondHeader'));
import { CompanyContext } from '../../Context/CompanyContext';
import { Navigate } from 'react-router-dom';

const EmployeesList = () => {
    const { employeeId, employee,employeeLoading,employeeError } = useContext(CompanyContext);
    return (
        <div className='fixed_direction'>
            {/* {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            } */}
            {
                employee && <EmployeesListComponent />
            }

            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}
                   </div>
    )
}

export default EmployeesList
