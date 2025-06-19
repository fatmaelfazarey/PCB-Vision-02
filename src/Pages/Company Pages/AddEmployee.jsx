import React, { lazy, useContext } from 'react'
const AddEmployeeComponent = lazy(() => import('../../Components/Company Components/Leader/AddEmployeeComponent'));
const SecondHeader = lazy(() => import('../../Shared/SecondHeader'));
import { CompanyContext } from '../../Context/CompanyContext';

import { Navigate } from 'react-router-dom';

const AddEmployee = () => {
    const { employeeId, employee, employeeLoading, employeeError } = useContext(CompanyContext);

    return (
        <div className=' fixed_direction'>
            {/* {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            } */}
            {
                employee && <AddEmployeeComponent />
            }

            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}
        </div>
    )
}

export default AddEmployee
