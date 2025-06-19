import React, { useContext, useEffect } from 'react'
import SecondHeader from '../Shared/SecondHeader';
import UploadPCB from '../Components/Main Component/UploadPCB';
import { AppContext } from '../Context/AppContext';
import { Navigate } from 'react-router-dom';
import Profile from './Profile';

import { useLocation, useNavigate } from 'react-router-dom';

const Main = () => {
    const { userId, user, userLoading, userError } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();

    const isProfilePage = location.pathname.includes('profile');

    const handleHeaderClick = () => {
        if (isProfilePage) {
            navigate(`/main/${userId}`);
        } else {
            navigate(`/main/${userId}/profile/${userId}`);
        }
    };
    return (
        <div className='pl-2.5 pr-2.5'>
            {
                user && <SecondHeader
                    isCompanyLogin={false}
                    // navigateTo={`/profile/${userId}`}
                    image={user.Image}
                    onClick={handleHeaderClick}
                />
            }
            <div className='mt-4'>
                {isProfilePage ? (
                    <Profile employeeId={userId} />
                ) : (
                    user && <UploadPCB />
                )}
            </div>

            {/* {
                user && <UploadPCB />
            } */}
            {!user && !userLoading && userError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}

        </div>
    )
}

export default Main
