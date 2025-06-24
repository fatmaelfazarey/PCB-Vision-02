// //#region json server end points
// // #region CompanyServices.js 
// export const CompanyServicesEndPoints = {
//     //Get a history for each role
//     GET_PCBS_URL: (role, userId) => `http://localhost:3002/PCBs?${role}_ID=${userId}`,
//     //Get the data of the employee who logged in
//     GET_EMPLOYEE_IS_LOGINED_URL: (employeeId) => `http://localhost:3002/employees/${employeeId}`,
//     //
//     LOGIN_AS_COMPANY_URL: (email, password) => `http://localhost:3002/employees?Email=${email}&Password=${password}`,
//     //Get all PCBS with pending status 
//     ALL_PCBS: `http://localhost:3002/PCBs`,
//     // For updating PCB status (PATCH) Pass or Repair
//     STATUS_UPDATE_URL: (pcbId) => `http://localhost:3002/PCBs/${pcbId}`,
//     //POST
//     ADD_NEW_EMPLOYEE: `http://localhost:3002/employees`,
//     //Get
//     ALL_EMPLOYEES: `http://localhost:3002/employees`,
//     // DELETE
//     DELETE_AN_EMPLOYEE: (employeeId) => `http://localhost:3002/employees/${employeeId}`,
// };
// //#endregion

// //#region PersonalServices.js
// export const PersonalServicesEndPoints = {
//     // POST
//     ADD_NEW_USER_URL: () => `http://localhost:3001/users`,
//     // GET => Returns user data and token. Note: when calling the backend in the LoginUser function, replace users[0].id with the token
//     LOGIN_URL: (email, password) => `http://localhost:3001/users?Email=${email}&Password=${password}`,
//     // GET => Return user data
//     GET_USER_IS_LOGINED: (userId) => `http://localhost:3001/users/${userId}`,
//     //GET 
//     FORGOT_PASSWORD_URL: (email, phone) => `http://localhost:3001/users?Email=${email}&Phone=${phone}`,
//     //GET 
//     GET_USER_WITH_EMAIL_TO_UPDATE_PASSWORD: (email) => `http://localhost:3001/users?Email=${email}`,
//     //PUT
//     Put_USER_WITH_NEW_PASSWORD: (id) => `http://localhost:3001/users/${id}`,
//     //GET 
//     GET_USER_HISTORY: (userId) => `http://localhost:3001/pcbs?userId=${userId}`
// };
// //#endregion

// //#region SharedServices.js
// export const SharedServicesEndPoints = {
//     // POST
//     ADD_NEW_PCB_COMPANY_URL: () => `http://localhost:3002/PCBs`,
//     ADD_NEW_PCB_USER_URL: () => `http://localhost:3001/pcbs`,

//     // PATCH
//     UPDATE_USER_INFO_COMPANY_URL: (id) => `http://localhost:3002/employees/${id}`,
//     UPDATE_USER_INFO_USER_URL: (id) => `http://localhost:3001/users/${id}`,

//     // DELETE
//     DELETE_PCB_COMPANY_URL: (pcbId) => `http://localhost:3002/PCBs/${pcbId}`,
//     DELETE_PCB_USER_URL: (pcbId) => `http://localhost:3001/pcbs/${pcbId}`,

//     //POST 
//     SEND_FEEDBACK_URL: () => `http://localhost:3003/feedback`,
// };

// //#endregion

// //#region CallAI.js
// export const CallAIEndPoints = {
//     //POST 
//     DETECT_COMPONENTS_URL: () => `https://abdrabo01-components-api.hf.space/predict`,
//     DETECT_DEFECTS_URL: () => `https://abdrabo01-defects-api.hf.space/predict`
// };

// //#endregion
//#endregion

// -------------------------

// #region CompanyServices.js 

// https://0936-41-46-34-191.ngrok-free.app/api/Leader/delete-employee/352d6e08-af99-4705-8f81-c32f4755b017

const url = `https://7598-41-46-34-191.ngrok-free.app`;
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
    GET_USER_HISTORY: `${url}/api/Users/history`
};
//#endregion

//#region SharedServices.js
export const SharedServicesEndPoints = {
    // POST
    ADD_NEW_PCB_COMPANY_URL: `${url}/api/Operator/upload-pcb`,
    // ADD_NEW_PCB_USER_URL: () => `http://localhost:3001/pcbs`,

    // PATCH
    UPDATE_USER_INFO_COMPANY_URL: `${url}/api/Users/edit-profile`,
    UPDATE_USER_INFO_USER_URL: `${url}/api/Users/edit-profile`,

    // DELETE
    DELETE_PCB_COMPANY_URL: (pcbId) => `http://localhost:3002/PCBs/${pcbId}`,
    DELETE_PCB_USER_URL: (pcbId) => `http://localhost:3001/pcbs/${pcbId}`,

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



