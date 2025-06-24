import { CompanyServicesEndPoints } from "./EndPoints";


export const getPCBS = async (employeeId, setHistory, setUserHistoryLoading, setUserHistoryError, role = '') => {
    const url = CompanyServicesEndPoints.GET_PCBS_URL;
    setUserHistoryLoading(true);
    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch Employees : ${errorMessage}`);
        }
        const data = await response.json();
        setHistory(data);
    } catch (error) {
        console.error('Error fetching PCB history:', error.message);
        setUserHistoryError(error.message);
    } finally {
        setUserHistoryLoading(false);
    }
};

export const getEmployeeIsLogin = async (employeeId, setEmployee, setEmployeeLoading, setEmployeeError) => {

    const url = CompanyServicesEndPoints.GET_EMPLOYEE_IS_LOGINED_URL;
    setEmployeeLoading(true);
    try {
        const token = `Bearer ${employeeId}`;

        if (!token) throw new Error('No authentication token found');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Received non-JSON response:', text.substring(0, 100));
            throw new Error('Server returned unexpected format');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const userData = await response.json();
        setEmployee(userData);
        return userData;

    } catch (error) {
        console.error('Error logging in:', error);
        setEmployeeError(error)
    } finally {
        setEmployeeLoading(false);
    }
};

export const LoginAsCompany = async (email, password, setEmployee, setEmployeeId, setRole, setEmployeeLoading, setEmployeeError) => {

    const url = CompanyServicesEndPoints.LOGIN_AS_COMPANY_URL;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: email,
                password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Login failed with status: ${response.status}`);
        }
        const userData = await response.json();

        if (userData) {
            localStorage.setItem('employeeId', userData.token);
            localStorage.setItem('role', userData.roleName);
            alert("Login successful! 🎉");
            setEmployeeId(userData.token);
            setRole(userData.roleName);
            getEmployeeIsLogin(userData.token, setEmployee, setEmployeeLoading, setEmployeeError)
            return userData;
        } else {
            alert("Invalid credentials. Please try again.");
            return null;
        }

    } catch (error) {
        alert('Error logging in, Check the server connection');
        console.error('Error logging in:', error);
    }
};

export const AllPCBS = async (setPCBS, setPCBSLoading, setPCBSError) => {
    const url = CompanyServicesEndPoints.ALL_PCBS;
    setPCBSLoading(true);
    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;

        if (!token) throw new Error('No authentication token found');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Received non-JSON response:', text.substring(0, 100));
            throw new Error('Server returned unexpected format');
        }
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
        }
        const data = await response.json();

        setPCBS(data);
    } catch (error) {
        console.error('Error fetching PCB history:', error.message);
        setPCBSError(error.message);
    } finally {
        setPCBSLoading(false);
    }
};

export const GetPendingPCBS = async (setPCBS, setPCBSLoading, setPCBSError) => {
    const url = CompanyServicesEndPoints.Get_Pending_PCBS;
    setPCBSLoading(true);
    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;

        if (!token) throw new Error('No authentication token found');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Received non-JSON response:', text.substring(0, 100));
            throw new Error('Server returned unexpected format');
        }
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
        }
        const data = await response.json();
        setPCBS(data);
    } catch (error) {
        console.error('Error fetching PCB history:', error.message);
        setPCBSError(error.message);
    } finally {
        setPCBSLoading(false);
    }
};

export const StatusUpdate = async (pcbId, pcbStatus) => {
    const url = CompanyServicesEndPoints.STATUS_UPDATE_URL;
    const token = `Bearer ${localStorage.getItem('employeeId')}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                pcbId: pcbId,
                pass: pcbStatus
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Update failed with status ${response.status}: ${errorText}`);
        }
        return true;

    } catch (error) {
        console.error('PCB status update error:', error.message);
        return false;
    }
};

export const AddNewEmployee = async (employee) => {
    const url = CompanyServicesEndPoints.ADD_NEW_EMPLOYEE(employee.Role_ID);

    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                name: employee.Name,
                email: employee.Email,
                password: employee.Password,
                line_ID: employee.Line_ID
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }
        return true;
    }
    catch (error) {
        console.error('Error adding Employee:', error.message);
    }
}

export const AllEmployees = async (setEmployees, setEmployeesLoading, setEmployeesError) => {
    const url = CompanyServicesEndPoints.ALL_EMPLOYEES;
    setEmployeesLoading(true);

    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch Employees: ${errorMessage}`);
        }
        const data = await response.json();
        setEmployees(data);
        return data;
    } catch (error) {
        console.error('Error fetching Employees :', error.message);
        setEmployeesError(error.message);
    } finally {
        setEmployeesLoading(false);
    }
};

export const DeleteAnEmployee = async (employeeId) => {
    const url = CompanyServicesEndPoints.DELETE_AN_EMPLOYEE(employeeId);
    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            alert("This employee cannot be deleted because they are linked to other records in the system. Please remove or update the associated records before trying again.")
            throw new Error(`Failed to fetch Employees : ${errorMessage}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Employees :', error.message);
    }
}

export const GetAnEmployee = async (employeeId, setUserHistoryLoading, setUserHistoryError) => {
    const url = CompanyServicesEndPoints.EMPLOYEE_PROFILE(employeeId);
    setUserHistoryLoading(true);
    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;

        if (!token) throw new Error('No authentication token found');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch Employees : ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Employees :', error.message);
        setUserHistoryError(error.message)

    } finally {
        setUserHistoryLoading(false);
    }
}

// export const GetAnEmployeeHistory = async (employeeId, setHistory, setUserHistoryLoading, setUserHistoryError) => {
//     console.log(employeeId);
//     const url = CompanyServicesEndPoints.EMPLOYEE_HISTORY(employeeId);
//     console.log(url);
//     setUserHistoryLoading(true);
//     try {
//         const token = `Bearer ${localStorage.getItem('employeeId')}`;

//         if (!token) throw new Error('No authentication token found');

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': token,
//                 'Content-Type': 'application/json',
//                 'ngrok-skip-browser-warning': 'true'
//             }
//         });
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Failed to fetch Employees : ${errorMessage}`);
//         }
//         // alert('done')
//         const data = await response.json();
//         console.log("this emploee data : " + data);
//         setHistory(data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching Employees :', error.message);
//         setUserHistoryError(error.message);
//         // throw new Error(`Failed to fetch Employees : ${error.message}`);
//     } finally {
//         setUserHistoryLoading(false);
//     }
// }

export const EditEmployee = async (employeeId, employee) => {
    const url = CompanyServicesEndPoints.EDITE_EMPLOYEE(employeeId);

    try {
        const token = `Bearer ${localStorage.getItem('employeeId')}`;
        console.log(employee);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                email: employee.Email || '',
                name: employee.Name || '',
                line_ID: employee.Line_ID || '',
                roleName: employee.Role_ID || ''

            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Update failed with status ${response.status}: ${errorText}`);
        }

        return true;

    } catch (error) {
        console.error('Employee update error:', error.message);
        return false;
    }
}