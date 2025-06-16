import React, { useContext } from 'react'
import { CompanyContext } from '../../../Context/CompanyContext'
import { assets } from '../../../assets/assets'
import { useNavigate } from 'react-router-dom';
import { DeleteAnEmployee } from '../../../Services/CompanyServices';

const EmployeesListComponent = () => {
    const navigate = useNavigate()
    const { Employees, EmployeesLoading, EmployeesError, setIsEmployeeEditMode, setEditEmployee } = useContext(CompanyContext)

    const handleDelete = async (employeeId) => {
        if (!window.confirm('Do you want to delete this Employee ?')) return;
        const success = await DeleteAnEmployee(employeeId);
        if (success) showToastMessage('Employee deleted successfully. Please reload the page.');
    };

    const handleEdit = (employee) => {
        navigate(`edit-employee/${employee.id}`);
        setEditEmployee(employee);
        setIsEmployeeEditMode(true);
    };
    // Error state
    if (EmployeesError) {
        return (
            <div className='max-w-screen-xl mx-auto flex flex-col w-full min-h-[70vh]'>
                <div className='bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 w-full flex-1'>
                    <div className='bg-white dark:bg-gray-900 rounded-xl w-full h-full flex flex-col items-center justify-center gap-4 p-6'>
                        <img
                            loading="lazy"
                            src={assets.not_found}
                            alt="empty"
                            className='w-full max-w-md'
                        />
                        <p className='p-4 bg-white dark:bg-gray-900 text-red-500 dark:text-red-400'>
                            Error: {EmployeesError}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Loading state
    if (EmployeesLoading) {
        return (
            <div className='max-w-screen-xl mx-auto flex flex-col w-full min-h-[70vh]'>
                <div className='bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 w-full flex-1'>
                    <div className='bg-white dark:bg-gray-900 rounded-xl w-full h-full flex items-center justify-center'>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-screen-xl mx-auto px-4 py-6'>
            <h3 className="text-2xl font-medium text-gray-800 dark:text-white mb-6">
                Employees List
            </h3>

            {Employees && Employees.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Password
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Line
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {Employees.map((emp, i) => (
                                <tr
                                    key={i}
                                    onClick={() => navigate(`${emp.id}`)}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">
                                        {i + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={emp.Image || assets.add_user}
                                                alt={emp.Name}
                                                className="h-10 w-10 rounded-full object-cover"
                                                onError={(e) => (e.target.src = assets.add_user)}
                                            />
                                            <span className="text-gray-900 dark:text-white">
                                                {emp.Name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300">
                                        {emp.Email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300">
                                        {emp.Password}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300">
                                        {emp.Phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300">
                                        {emp.Role_ID}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300">
                                        {emp.Line_ID}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300" onClick={(e) => { e.stopPropagation(); handleEdit(emp); }}>

                                        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                            width="25px" height="25px" viewBox="0 0 494.936 494.936"
                                            xmlSpace="preserve">
                                            <g>
                                                <g>
                                                    <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                                                    <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                                                </g>
                                            </g>
                                        </svg>    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-gray-300" onClick={(e) => { e.stopPropagation(); handleDelete(emp.id) }}>
                                        <svg fill="#8B0000" width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z" /><path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z" /><path d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z" /></svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No employees found</p>
                </div>
            )
            }
        </div >
    )
}

export default EmployeesListComponent

//   {/* Patients Table Section */}
// <div
//     className='patientTableHandleScrollBar'
//     style={{ borderRadius: '8px', overflow: "scroll", flex: '1', height: '100%' }}
// >
//     {PatientError ? (
//         <p>Error: {PatientError.message}</p>
//     ) : !PatientsIsLoaded ? (
//         <p>Loading...</p>
//     ) : filteredPatients.length ? (
//         <table className="table table-hover">
//             <thead>
//                 <tr>
//                     <th scope="col" className='text-center align-middle'>#</th>
//                     <th scope="col" className='text-center align-middle'>Name</th>
//                     <th scope="col" className='text-center align-middle'>Age</th>
//                     <th scope="col" className='text-center align-middle'>Phone</th>
//                     <th scope="col" className='text-center align-middle'>Email</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {filteredPatients.map((p, i) => (
//                     <tr key={i} onClick={() => navigate(`/patient/${p.id}`)}>
//                         <th scope="row" className='text-center align-middle'>{i + 1}</th>
//                         <td className='d-flex align-items-center gap-2'>
//                             <img
//                                 src={p.image || assets.default_patient_image}
//                                 alt={p.name}
//                                 onError={(e) => (e.target.src = assets.default_patient_image)}
//                                 width='50'
//                                 style={{ borderRadius: "50%" }}
//                             />
//                             <p>{p.name}</p>
//                         </td>
//                         <td className='text-center align-middle'>{p.age}</td>
//                         <td className='text-center align-middle'>{p.phone}</td>
//                         <td className='text-center align-middle'>{p.email}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     ) : (
//         <div className='d-flex align-items-center justify-content-center flex-column h-100'>
//             <img src={assets.Detective_check_footprint} alt='No patients found' width='300' />
//             <span>Empty...</span>
//         </div>
//     )}
// </div>