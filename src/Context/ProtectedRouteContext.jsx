import { useContext } from "react";
import { createContext } from "react";
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from "./AppContext";
import { CompanyContext } from "./CompanyContext";

export const ProtectedRouteContext = createContext();

const ProtectedRouteContextProvider = (props) => {
    const { user, userLoading, userError } = useContext(AppContext);
    const { employee, setEmployeeLoading, setEmployeeError } = useContext(CompanyContext);
    let { userId: id,
        employeeId
    } = useParams();

    if (id && localStorage.getItem('userId') !== id) {
        return <Navigate to='/not-access' state={{ path: location.pathname }} />;
    } else if (employeeId && localStorage.getItem('employeeId') !== employeeId) {
        return <Navigate to='/not-access' state={{ path: location.pathname }} />;
    }

    // if (!id) {
    //     return <Navigate to='/connection-error' state={{ path: location.pathname }} />;

    // } else if (!employeeId) {
    //     return <Navigate to='/connection-error' state={{ path: location.pathname }} />;
    // }

    const value = {
    };

    return (
        <ProtectedRouteContext.Provider value={value}>
            {props.children}
        </ProtectedRouteContext.Provider>
    );
};

export default ProtectedRouteContextProvider;
