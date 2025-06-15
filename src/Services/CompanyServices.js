import { CompanyServicesEndPoints } from "./EndPoints";

export const getPCBS = async (employeeId, setHistory, setUserHistoryLoading, setUserHistoryError, role = '') => {

    // const url = `http://localhost:3002/PCBs?${role}_ID=${employeeId}`;
    const url = CompanyServicesEndPoints.GET_PCBS_URL(role, employeeId);
    setUserHistoryLoading(true);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
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

export const getEmployeeIsLogin = async (employeeId, setEmployee) => {
    // const url = `http://localhost:3002/employees/${employeeId}`;
    const url = CompanyServicesEndPoints.GET_EMPLOYEE_IS_LOGINED_URL(employeeId);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        if (users) {
            setEmployee(users);
            localStorage.setItem('employeeId', users.id);
            localStorage.setItem('role', users.Role_ID);
            return users;
        } else {
            alert("Invalid user. Please try again.");
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

export const LoginAsCompany = async (email, password, setEmployee, setEmployeeId, setRole) => {
    // const url = `http://localhost:3002/employees?Email=${email}&Password=${password}`;
    const url = CompanyServicesEndPoints.LOGIN_AS_COMPANY_URL(email, password);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        if (users.length > 0) {
            // alert("Login successful! 🎉");
            // localStorage.setItem('employeeId', users[0].id);
            // localStorage.setItem('role', users[0].Role_ID);
            // setRole(users[0].Role_ID);
            // setEmployeeId(users[0].id);
            // getEmployeeIsLogin(users[0].id, setEmployee, setRole)
            // setEmployee(users[0]);
            // setEmployeeId(users[0].id);
            // setRole(users[0].Role_ID);
            // localStorage.setItem('employeeId', users[0].id);
            // localStorage.setItem('role', users[0].Role_ID);

              alert("Login successful! 🎉");
            setEmployee(users[0]);
            setEmployeeId(users[0].id);
            setRole(users[0].Role_ID);
            localStorage.setItem('employeeId', users[0].id);
            localStorage.setItem('role', users[0].Role_ID);
            return users[0];
            return users[0];
        } else {
            alert("Invalid email or password. Please try again.");
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

export const AllPCBS = async (setPCBS, setPCBSLoading, setPCBSError) => {
    // const url = `http://localhost:3002/PCBs`;
    const url = CompanyServicesEndPoints.ALL_PCBS;
    setPCBSLoading(true);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
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

export const StatusUpdate = async (pcbId, passFailUpdate) => {
    const url = CompanyServicesEndPoints.STATUS_UPDATE_URL(pcbId);

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passFailUpdate)
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