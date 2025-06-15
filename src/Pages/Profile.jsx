import React, { useContext } from 'react'
import SecondHeader from '../Shared/SecondHeader';
import UserInformation from '../Shared/UserInformation';
import History from '../Shared/History';
import { AppContext } from '../Context/AppContext';

const Profile = () => {
    const { userId, user } = useContext(AppContext);
    const { history, userHistoryLoading, userHistoryError } = useContext(AppContext);
    return (
        <div className='pl-2.5 pr-2.5'>

            {
                user && <SecondHeader
                    isCompanyLogin={false}
                    navigateTo={`/main/${userId}`}
                    image={user.Image} />
            }
            {
                user && <UserInformation
                    isCompanyLogin={false}
                    id={userId}
                    image={user.Image}
                    name={user.Name}
                    email={user.Email}
                    phone={user.Phone}
                    password={user.Password}
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
        </div>
    )
}

export default Profile
