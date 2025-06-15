import React, { useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import UserInformation from '../../Shared/UserInformation';
import History from '../../Shared/History';

const CompanyProfile = () => {
    const { employeeId, role, employee } = useContext(CompanyContext);
    const { history, userHistoryLoading, userHistoryError } = useContext(CompanyContext);
    const { PCBS, PCBSLoading, PCBSError } = useContext(CompanyContext);

    return (
        <div className='pl-2.5 pr-2.5'>
            {
                employee && <SecondHeader
                    isCompanyLogin={true}
                    navigateTo={`/${employee.Role_ID}/${employeeId}`}
                    image={employee.Image} />
            }

            {
                employee && <UserInformation

                    isCompanyLogin={true}
                    id={employeeId}
                    image={employee.Image}
                    name={employee.Name}
                    email={employee.Email}
                    phone={employee.Phone}
                    Date_of_Birth={employee.Date_of_Birth}
                    Line_ID={employee.Line_ID}
                    Password={employee.Password}
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

        </div>
    )
}

export default CompanyProfile
