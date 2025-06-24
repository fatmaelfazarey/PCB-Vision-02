import React, { useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import UserInformation from '../../Shared/UserInformation';
import History from '../../Shared/History';
import { Navigate } from 'react-router-dom';

const CompanyProfile = () => {
    const { employeeId, role, employee, employeeLoading, employeeError } = useContext(CompanyContext);
    const { history, userHistoryLoading, userHistoryError } = useContext(CompanyContext);
    const { PCBS, PCBSLoading, PCBSError } = useContext(CompanyContext);

    return (
        <div className='fixed_direction'>
            {/* {
                employee && <SecondHeader
                    isCompanyLogin={true}
                    navigateTo={`/${employee.Role_ID}/${employeeId}`}
                    image={employee.Image} />
            } */}

            {
                employee && <UserInformation

                    isCompanyLogin={true}
                    id={employeeId}
                    image={employee.image}
                    name={employee.name}
                    email={employee.email}
                    phone={employee.phone}
                    Date_of_Birth={employee.date_of_Birth}
                    Line_ID={employee.line_ID}
                    Password={employee.password}
                />
            }
            {
                employee && <History
                    role={role}
                    isCompanyLogin={true}
                    employeeId={employeeId}
                    Line_ID={employee && employee.Line_ID}
                    history={role === 'Leader' ? PCBS : history}
                    userHistoryLoading={role === 'Leader' ? PCBSLoading : userHistoryLoading}
                    userHistoryError={role === 'Leader' ? PCBSError : userHistoryError}
                    navigateTo={`/${employee.Role_ID}/${employeeId}`}
                />
            }
            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}

        </div>
    )
}

export default CompanyProfile
