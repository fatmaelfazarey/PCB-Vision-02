// #region CompanyServices.js 
export const CompanyServicesEndPoints = {
    //Get a history for each role
    GET_PCBS_URL: (role, userId) => `http://localhost:3002/PCBs?${role}_ID=${userId}`,
    //Get the data of the employee who logged in
    GET_EMPLOYEE_IS_LOGINED_URL: (employeeId) => `http://localhost:3002/employees/${employeeId}`,
    //
    LOGIN_AS_COMPANY_URL: (email, password) => `http://localhost:3002/employees?Email=${email}&Password=${password}`,
    //Get all PCBS with pending status 
    ALL_PCBS: `http://localhost:3002/PCBs`,
    // For updating PCB status (PATCH) Pass or Repair
    STATUS_UPDATE_URL: (pcbId) => `http://localhost:3002/PCBs/${pcbId}`,
};
//#endregion

//#region PersonalServices.js
export const PersonalServicesEndPoints = {
    // POST
    ADD_NEW_USER_URL: () => `http://localhost:3001/users`,
    // GET => Returns user data and token. Note: when calling the backend in the LoginUser function, replace users[0].id with the token
    LOGIN_URL: (email, password) => `http://localhost:3001/users?Email=${email}&Password=${password}`,
    // GET => Return user data
    GET_USER_IS_LOGINED: (userId) => `http://localhost:3001/users/${userId}`,
    //GET 
    FORGOT_PASSWORD_URL: (email, phone) => `http://localhost:3001/users?Email=${email}&Phone=${phone}`,
    //GET 
    GET_USER_WITH_EMAIL_TO_UPDATE_PASSWORD: (email) => `http://localhost:3001/users?Email=${email}`,
    //PUT
    Put_USER_WITH_NEW_PASSWORD: (id) => `http://localhost:3001/users/${id}`,
    //GET 
    GET_USER_HISTORY: (userId) => `http://localhost:3001/pcbs?userId=${userId}`
};
//#endregion

//#region SharedServices.js
export const SharedServicesEndPoints = {
    // POST
    ADD_NEW_PCB_COMPANY_URL: () => `http://localhost:3002/PCBs`,
    ADD_NEW_PCB_USER_URL: () => `http://localhost:3001/pcbs`,

    // PATCH
    UPDATE_USER_INFO_COMPANY_URL: (id) => `http://localhost:3002/employees/${id}`,
    UPDATE_USER_INFO_USER_URL: (id) => `http://localhost:3001/users/${id}`,

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
    DETECT_COMPONENTS_URL: () => `https://abdrabo01-components-api.hf.space/predict`,
    DETECT_DEFECTS_URL: () => `https://abdrabo01-defects-api.hf.space/predict`
};

//#endregion


