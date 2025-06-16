import React from 'react'
import { Link } from 'react-router-dom'

const EmployeesControlPanel = () => {
    return (
        <div className='flex justify-between items-center p-2 mb-2'>
            <Link to='add-employee' className='w-[50%] text-center text-main font-bold'><u>Add Employee</u></Link>
            <Link to='employees' className='w-[50%] text-center text-main font-bold'><u>All employees</u></Link>
        </div>
    )
}

export default EmployeesControlPanel
