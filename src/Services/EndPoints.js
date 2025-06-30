
export const dashboard_url = `https://b304-154-178-243-190.ngrok-free.app`;

const url = `https://0560-154-178-243-190.ngrok-free.app`;






// #region CompanyServices.js 
export const CompanyServicesEndPoints = {
    //Get a history for each role
    GET_PCBS_URL: `${url}/api/Employee/my-history`,

    Get_Pending_PCBS: `${url}/api/Engineer/pending-pcbs`,
    //Get the data of the employee who logged in
    GET_EMPLOYEE_IS_LOGINED_URL: `${url}/api/Employee/profile_Employee`,
    //
    LOGIN_AS_COMPANY_URL: `${url}/api/Employee/login_Emp`,
    //Get all PCBS 
    ALL_PCBS: `${url}/api/Leader/pcbs`,
    // For updating PCB status (PATCH) Pass or Repair
    STATUS_UPDATE_URL: `${url}/api/Engineer/review`,
    //POST
    ADD_NEW_EMPLOYEE: (role) => `${url}/api/Employee/register_Employee?role=${role}`,
    //Get
    ALL_EMPLOYEES: `${url}/api/Leader/all-employees`,
    // DELETE
    DELETE_AN_EMPLOYEE: (employeeId) => `${url}/api/Leader/delete-employee/${employeeId}`,
    EDITE_EMPLOYEE: (id) => `${url}/api/Leader/edit-employee/${id}`,
    EMPLOYEE_PROFILE: (id) => `${url}/api/Leader/employee-profile/${id}`,
    EMPLOYEE_HISTORY: (id) => `${url}/api/Leader/employee-history/${id}`
};
//#endregion

//#region PersonalServices.js
export const PersonalServicesEndPoints = {
    // POST
    ADD_NEW_USER_URL: `${url}/api/Users/register`,
    // GET => Returns user data and token. Note: when calling the backend in the LoginUser function, replace users[0].id with the token
    LOGIN_URL: `${url}/api/Users/login`,
    // GET => Return user data
    GET_USER_IS_LOGINED: `${url}/api/Users/profile`,
    //GET 
    GET_USER_HISTORY: `${url}/api/Users/history`,
    FORGOT_PASSWORD_URL: `${url}/api/Users/forgot-password`,
    RESET_PASSWORD: `${url}/api/Users/reset-password`
};
//#endregion

//#region SharedServices.js
export const SharedServicesEndPoints = {
    // POST
    ADD_NEW_PCB_COMPANY_URL: `${url}/api/Operator/upload-pcb`,
    // ADD_NEW_PCB_USER_URL: () => `http://localhost:3001/pcbs`,

    // PATCH
    UPDATE_USER_INFO_COMPANY_URL: `${url}/api/Employee/update-profile`,
    UPDATE_USER_INFO_USER_URL: `${url}/api/Users/edit-profile`,

    // DELETE
    DELETE_PCB_COMPANY_URL: (pcbId) => `${url}/api/Leader/delete-by-id/${pcbId}`,
    DELETE_PCB_USER_URL: (pcbId) => `${url}/api/Users/delete-history/${pcbId}`,

    //POST 
    SEND_FEEDBACK_URL: () => `http://localhost:3003/feedback`,
};

//#endregion

//#region CallAI.js
export const CallAIEndPoints = {
    //POST 
    DETECT_COMPONENTS_URL: `${url}/api/Users/upload-image-component`,
    DETECT_DEFECTS_URL: `${url}/api/Users/upload-image-defects`,
    DETECT_DEFECTS_AND_COMPONENTS_URL: `${url}/api/Users/upload-two-images`
};

//#endregion



