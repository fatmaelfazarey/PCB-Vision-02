import React, { useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import History from '../../Shared/History';

const Engineer = () => {
    const { employeeId, employee, role } = useContext(CompanyContext);
    const { PCBS, PCBSLoading, PCBSError } = useContext(CompanyContext);
    return (
        <div className='pl-2.5 pr-2.5 min-h-lvh'>
            {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            }
            {
                employee && <History
                    role={role}
                    isEngineerView={true}
                    isCompanyLogin={true}
                    isHistory={false}
                    employeeId={employeeId}
                    Line_ID={employee && employee.Line_ID}
                    history={PCBS}
                    userHistoryLoading={PCBSLoading}
                    userHistoryError={PCBSError}
                    navigateTo={`/${employee.Role_ID}/${employeeId}`}
                />
            }

        </div>
    )
}

export default Engineer
