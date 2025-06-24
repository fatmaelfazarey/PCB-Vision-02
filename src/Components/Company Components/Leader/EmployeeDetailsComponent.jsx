import React, { useState, useEffect, useContext } from 'react';
import UserInformation from '../../../Shared/UserInformation';
import { CompanyContext } from '../../../Context/CompanyContext';
import { GetAnEmployee } from '../../../Services/CompanyServices';
import { useParams } from 'react-router-dom';
import History from '../../../Shared/History';

const EmployeeDetailsComponent = () => {
  const { employeeDetailsId } = useParams();
  const { editEmployee } = useContext(CompanyContext); // Fixed: using useContext and destructuring properly
  const [showEmployee, setShowEmployee] = useState(null);
  // const [employeeHistory, setEmployeeHistory] = useState();
  const [employeeHistoryLoading, setEmployeeHistoryLoading] = useState(false);
  const [employeeHistoryError, setEmployeeHistoryError] = useState(null);

  // Fetch employee data
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        // Case 1: Use editEmployee if available (from context)
        if (editEmployee && editEmployee.ID === employeeDetailsId) {
          setShowEmployee({
            Image: editEmployee.image || '',
            Name: editEmployee.name || '',
            Email: editEmployee.email || '',
            Phone: editEmployee.phone || '',
            Password: editEmployee.password || '',
            Role_ID: editEmployee.role_ID || '',
            Line_ID: editEmployee.line_ID || '',
            Date_of_Birth: editEmployee.Date_of_Birth || ''
          });
          return;
        }

        // Case 2: Fetch employee data if we have an ID but no context data
        if (employeeDetailsId) {
          const employeeData = await GetAnEmployee(employeeDetailsId, setEmployeeHistoryLoading, setEmployeeHistoryError);

          if (employeeData) {
            setShowEmployee({
              Image: employeeData.image || '',
              Name: employeeData.name || '',
              Email: employeeData.email || '',
              Phone: employeeData.phone || '',
              Password: employeeData.password || '',
              Role_ID: employeeData.roleName || '',
              Line_ID: employeeData.line_ID || '',
              Date_of_Birth: employeeData.date_of_Birth || '',
              history: employeeData.history || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading employee data:', error);
        // Consider adding error state handling here
      }
    };

    loadEmployeeData();
  }, [editEmployee, employeeDetailsId]);

  if (!showEmployee) {
    return <div className='dark:text-second text-second-dark'>Loading employee data...</div>; // Add proper loading state
  }

  return (
    <div>
      <UserInformation
        isCompanyLogin={true}
        id={employeeDetailsId} // Using the actual ID from URL params
        image={showEmployee.Image}
        name={showEmployee.Name}
        email={showEmployee.Email}
        phone={showEmployee.Phone}
        Date_of_Birth={showEmployee.Date_of_Birth}
        Line_ID={showEmployee.Line_ID}
        Password={showEmployee.Password}
        isViewMode={true}
      />

      <History
        role={showEmployee.Role_ID}
        isCompanyLogin={true}
        employeeId={employeeDetailsId} // Using the actual ID from URL params
        // Line_ID={showEmployee.Line_ID}
        // history={employeeHistory}
        history={showEmployee.history}
        userHistoryLoading={employeeHistoryLoading}
        userHistoryError={employeeHistoryError}
      />
    </div>
  );
};

export default EmployeeDetailsComponent;