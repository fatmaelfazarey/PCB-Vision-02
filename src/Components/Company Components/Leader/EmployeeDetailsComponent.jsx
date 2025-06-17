import React, { useState, useEffect, useContext } from 'react';
import UserInformation from '../../../Shared/UserInformation';
import { CompanyContext } from '../../../Context/CompanyContext';
import { GetAnEmployee, getPCBS } from '../../../Services/CompanyServices';
import { useParams } from 'react-router-dom';
import History from '../../../Shared/History';

const EmployeeDetailsComponent = () => {
  const { employeeDetailsId } = useParams();
  const { editEmployee } = useContext(CompanyContext); // Fixed: using useContext and destructuring properly
  const [showEmployee, setShowEmployee] = useState(null);
  const [history, setHistory] = useState([]);
  const [userHistoryLoading, setUserHistoryLoading] = useState(false);
  const [userHistoryError, setUserHistoryError] = useState(null);

  // Fetch employee data
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        // Case 1: Use editEmployee if available (from context)
        if (editEmployee && editEmployee.ID === employeeDetailsId) {
          setShowEmployee({
            Image: editEmployee.Image || '',
            Name: editEmployee.Name || '',
            Email: editEmployee.Email || '',
            Phone: editEmployee.Phone || '',
            Password: editEmployee.Password || '',
            Role_ID: editEmployee.Role_ID || '',
            Line_ID: editEmployee.Line_ID || '',
            Date_of_Birth: editEmployee.Date_of_Birth || ''
          });
          return;
        }

        // Case 2: Fetch employee data if we have an ID but no context data
        if (employeeDetailsId) {
          const employeeData = await GetAnEmployee(employeeDetailsId);
          if (employeeData) {
            setShowEmployee({
              Image: employeeData.Image || '',
              Name: employeeData.Name || '',
              Email: employeeData.Email || '',
              Phone: employeeData.Phone || '',
              Password: employeeData.Password || '',
              Role_ID: employeeData.Role_ID || '',
              Line_ID: employeeData.Line_ID || '',
              Date_of_Birth: employeeData.Date_of_Birth || ''
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

  // Fetch PCB history when employee data is available
  useEffect(() => {
    const fetchPCBHistory = async () => {
      if (!employeeDetailsId || !showEmployee?.Role_ID) return;
      // getPCBS(employeeId, setHistory, setUserHistoryLoading, setUserHistoryError, role);

      try {
        getPCBS(employeeDetailsId, setHistory, setUserHistoryLoading, setUserHistoryError, showEmployee.Role_ID);
        // setUserHistoryLoading(true);
        // setUserHistoryError(null);

        // const url = `http://localhost:3002/PCBs?${showEmployee.Role_ID}_ID=${employeeDetailsId}`;
        // const response = await fetch(url, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (!response.ok) {
        //   const errorMessage = await response.text();
        //   throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
        // }

        // const data = await response.json();
        // setHistory(data);
      } catch (error) {
        console.error('Error fetching PCB history:', error.message);
        // setUserHistoryError(error.message);
      }
    };

    fetchPCBHistory();
  }, [showEmployee, employeeDetailsId]);

  if (!showEmployee) {
    return <div>Loading employee data...</div>; // Add proper loading state
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
        Line_ID={showEmployee.Line_ID}
        history={history}
        userHistoryLoading={userHistoryLoading}
        userHistoryError={userHistoryError}
      />
    </div>
  );
};

export default EmployeeDetailsComponent;