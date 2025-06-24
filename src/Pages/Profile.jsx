import React, { useContext } from 'react'
// import SecondHeader from '../Shared/SecondHeader';
import UserInformation from '../Shared/UserInformation';
import History from '../Shared/History';
import { AppContext } from '../Context/AppContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { userId, user, userLoading, userError } = useContext(AppContext);
    const { history, userHistoryLoading, userHistoryError } = useContext(AppContext);
    return (
        <div className='pl-2.5 pr-2.5'>
            {/* 
            {
                user && <SecondHeader
                    isCompanyLogin={false}
                    navigateTo={`/main/${userId}`}
                    image={user.Image} />
            } */}
            {
                user && <UserInformation
                    isCompanyLogin={false}
                    id={userId}
                    image={user.image}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    password={user.password}
                />
            }
            {user && <History
                isCompanyLogin={false}
                id={userId}
                history={history}
                userHistoryLoading={userHistoryLoading}
                userHistoryError={userHistoryError}
                navigateTo={`/main/${userId}`}
            />}
            {!user && !userLoading && userError && <Navigate to='/connection-error' state={{ path: location.pathname }} />}
        </div>
    )
}

export default Profile
