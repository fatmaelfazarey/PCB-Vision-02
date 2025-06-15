import React, { useContext } from 'react'
import SecondHeader from '../../Shared/SecondHeader'
import { CompanyContext } from '../../Context/CompanyContext';
import UploadPCBWQR from '../../Components/Company Components/Operator Component/UploadPCBWQR';


const Operator = () => {
    const { employeeId, employee } = useContext(CompanyContext);
    return (
        <div className='pl-2.5 pr-2.5'>
            {
                employee && <SecondHeader navigateTo={`/company-profile/${employeeId}`} isCompanyLogin={true} image={employee.Image} />
            }
            <UploadPCBWQR employeeId={employeeId} Line_ID={employee && employee.Line_ID} />
        </div>
    )
}

export default Operator
