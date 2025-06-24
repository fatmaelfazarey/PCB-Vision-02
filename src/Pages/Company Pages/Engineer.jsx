import React, { useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import History from '../../Shared/History';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import CompanyProfile from './CompanyProfile';
import Loading from '../../Shared/Loading/Loading';

const Engineer = () => {
    const { employeeId, employee, role, employeeLoading, employeeError } = useContext(CompanyContext);
    // const { PCBS, PCBSLoading, PCBSError } = useContext(CompanyContext);
    const { PendingPCBS, PendingPCBSLoading, PendingPCBSError } = useContext(CompanyContext);

    const location = useLocation();
    const navigate = useNavigate();

    const isProfilePage = location.pathname.includes('company-profile');

    const handleHeaderClick = () => {
        if (isProfilePage) {
            navigate(`/engineer/${employeeId}`);
        } else {
            navigate(`/engineer/${employeeId}/company-profile/${employeeId}`);
        }
    };

    return (
        <div className='pl-2.5 pr-2.5 min-h-lvh fixed_direction'>
            {employeeLoading && <Loading />}
            {
                employee && <SecondHeader
                    isCompanyLogin={true}
                    image={employee.Image}
                    onClick={handleHeaderClick}
                />}
            <div className='mt-4'>
                {isProfilePage ? (
                    <CompanyProfile employeeId={employeeId} />
                ) : (
                    employee && <History
                        role={role}
                        isEngineerView={true}
                        isCompanyLogin={true}
                        isHistory={false}
                        employeeId={employeeId}
                        Line_ID={employee && employee.Line_ID}
                        history={PendingPCBS}
                        userHistoryLoading={PendingPCBSLoading}
                        userHistoryError={PendingPCBSError}
                        navigateTo={`/${employee.Role_ID}/${employeeId}`}
                    />
                )}
            </div>
            {/* {
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
            } */}
            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}

        </div>
    )
}

export default Engineer
