import React, { useContext } from 'react'
import StatisticsComponent from '../../Components/Company Components/Dashboard/Statistics';
import { CompanyContext } from '../../Context/CompanyContext';
// const EmployeesControlPanel = lazy(() => import('../../Components/Company Components/Dashboard/EmployeesControlPanel'));

const Statistics = () => {
    const { employeeId, employee, employeeLoading, employeeError } = useContext(CompanyContext);
    return (
        <div>
            {
                employee && <div className='max-w-screen-xl mx-auto '>
                    <StatisticsComponent />
                </div>
            }
            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}

        </div>
    )
}

export default Statistics
