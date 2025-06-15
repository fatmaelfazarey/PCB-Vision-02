import React, { useContext, useEffect } from 'react'
import SecondHeader from '../Shared/SecondHeader';
import UploadPCB from '../Components/Main Component/UploadPCB';
import { AppContext } from '../Context/AppContext';

const Main = () => {
    const { userId, user } = useContext(AppContext);

    return (
        <div className='pl-2.5 pr-2.5'>
            {
                user && <SecondHeader
                    isCompanyLogin={false}
                    navigateTo={`/profile/${userId}`}
                    image={user.Image} />
            }
            <UploadPCB />
        </div>
    )
}

export default Main
