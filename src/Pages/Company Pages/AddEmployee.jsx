import React, { lazy, useContext, useLocation } from 'react'
const AddEmployeeComponent = lazy(() => import('../../Components/Company Components/Leader/AddEmployee'));
const SecondHeader = lazy(() => import('../../Shared/SecondHeader'));
import { CompanyContext } from '../../Context/CompanyContext';

const AddEmployee = () => {
    const { employeeId, employee, role } = useContext(CompanyContext);

    // const location = useLocation();
    // const { employeeData, isEditMode } = location.state || {};



    return (
        <div className='pl-2.5 pr-2.5'>
            {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            }
            <AddEmployeeComponent />
        </div>
    )
}

export default AddEmployee
