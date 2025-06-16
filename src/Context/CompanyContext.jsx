import { createContext, useState, useEffect } from "react";
import { getPCBS, getEmployeeIsLogin, LoginAsCompany, AllPCBS, AllEmployees } from "../Services/CompanyServices";

export const CompanyContext = createContext();

const CompanyContextProvider = (props) => {
    const [employee, setEmployee] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('employeeId') && localStorage.getItem('role')) {
            setEmployeeId(localStorage.getItem('employeeId'));
            setRole(localStorage.getItem('role'));
            getEmployeeIsLogin(localStorage.getItem('employeeId'), setEmployee);
        }
    }, []);
    //#region get History
    const [history, setHistory] = useState(null);
    const [userHistoryLoading, setUserHistoryLoading] = useState(false);
    const [userHistoryError, setUserHistoryError] = useState(null);
    useEffect(() => {

        if (employeeId) {
            // getPCBS(employeeId, setHistory, setUserHistoryLoading, setUserHistoryError, true, role);
            getPCBS(employeeId, setHistory, setUserHistoryLoading, setUserHistoryError, role);
        }
    }, [employeeId]);

    //#endregion

    //#region All PCBS
    const [PCBS, setPCBS] = useState(null);
    const [PCBSLoading, setPCBSLoading] = useState(false);
    const [PCBSError, setPCBSError] = useState(null);
    useEffect(() => {
        if (employeeId) {
            AllPCBS(setPCBS, setPCBSLoading, setPCBSError);
        }
    }, [employeeId]);

    //#endregion
    //#region All Employees
    const [Employees, setEmployees] = useState(null);
    const [EmployeesLoading, setEmployeesLoading] = useState(false);
    const [EmployeesError, setEmployeesError] = useState(null);
    useEffect(() => {
        if (employeeId && role === 'Leader') {
            AllEmployees(setEmployees, setEmployeesLoading, setEmployeesError);
        }
    }, [employeeId]);

    //#endregion
    //#region  edit employee
    const [editEmployee, setEditEmployee] = useState(null);
    const [isEmployeeEditMode, setIsEmployeeEditMode] = useState(false);

    //#endregion

    const value = {
        LoginAsCompany,
        setEmployee,
        setEmployeeId,
        employee,
        employeeId,
        userHistoryError,
        userHistoryLoading,
        history,
        PCBS, PCBSLoading, PCBSError,
        role, setRole,
        Employees, EmployeesLoading, EmployeesError,
        editEmployee, setEditEmployee,
        isEmployeeEditMode, setIsEmployeeEditMode
    };

    return (
        <CompanyContext.Provider value={value}>
            {props.children}
        </CompanyContext.Provider>
    );
};

export default CompanyContextProvider;
