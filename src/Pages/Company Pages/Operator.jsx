import React, { useContext } from 'react';
import SecondHeader from '../../Shared/SecondHeader';
import { CompanyContext } from '../../Context/CompanyContext';
import UploadPCBWQR from '../../Components/Company Components/Operator Component/UploadPCBWQR';
import CompanyProfile from './CompanyProfile';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Operator = () => {
    const { employeeId, employee ,employeeError,employeeLoading} = useContext(CompanyContext);
    const location = useLocation();
    const navigate = useNavigate();

    const isProfilePage = location.pathname.includes('company-profile');

    const handleHeaderClick = () => {
        if (isProfilePage) {
            navigate(`/operator/${employeeId}`);
        } else {
            navigate(`/operator/${employeeId}/company-profile/${employeeId}`);
        }
    };

    return (
        <div className='pl-2.5 pr-2.5 fixed_direction'>
            {employee && (
                <SecondHeader
                    isCompanyLogin={true}
                    image={employee.Image}
                    onClick={handleHeaderClick}
                />
            )}
            <div className='mt-4'>
                {isProfilePage ? (
                    <CompanyProfile employeeId={employeeId} />
                ) : (
                    employee && <UploadPCBWQR employeeId={employeeId} Line_ID={employee.Line_ID} />
                )}
            </div>
            {!employee && !employeeLoading && employeeError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}

        </div>
    );
};

export default Operator;