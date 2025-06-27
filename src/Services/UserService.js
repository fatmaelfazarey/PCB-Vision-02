import { PersonalServicesEndPoints } from "./EndPoints";
export const AddNewUser = async (userData) => {
    const url = PersonalServicesEndPoints.ADD_NEW_USER_URL;
    // console.log("Request URL:", url);
    // const formattedDate = userData.dateOfBirth.split('-').reverse().join('-');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || '',
                dateOfBirth: userData.dateOfBirth || '',
                password: userData.password || '',
                confirmPassword: userData.confirmPassword || ''
            }),
        });
        // console.log("userData.dateOfBirth" + userData.dateOfBirth)

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Validation Errors:', errorData);


            if (Array.isArray(errorData)) {
                const errorMessages = errorData.map(error => error.description);
                const formattedErrors = errorMessages.join('\n\n');
                alert(`Registration failed:\n\n${formattedErrors}`);
                throw new Error(formattedErrors);
            }

            else if (errorData.errors) {
                const errorMessages = Object.values(errorData.errors).join('\n\n');
                alert(`Registration failed:\n\n${errorMessages}`);
                throw new Error(errorMessages);
            }
            else {
                const errorMessage = errorData.message || 'Failed to register user. Please try again.';
                alert(`Registration failed:\n\n${errorMessage}`);
                throw new Error(errorMessage);
            }
        }

        if (response.status === 204) {
            // console.log("User added successfully (no content returned).");
            // alert("User registered successfully!");
            return { success: true };
        }

        const data = await response.json();
        console.log("Registration Success:", data);
        // alert("User registered successfully!");
        return data;

    } catch (error) {
        console.error('Registration Error:', error.message);


        if (!error.message.startsWith('Registration failed:')) {
            alert(`Registration Error: ${error.message || 'An unknown error occurred'}`);
        }

        throw error;
    }
};

export const getUserIsLogined = async (userId, setUser, setUserLoading, setUserError) => {

    const url = PersonalServicesEndPoints.GET_USER_IS_LOGINED;
    setUserLoading(true);

    try {

        const token = `Bearer ${userId}`;

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
        // console.log('get user is logined : ' + userData)
        setUser(userData);
        return userData;
    } catch (error) {
        console.error('Fetch error:', error);
        setUserError(error.message);
        return null;
    } finally {
        setUserLoading(false);
    }
};

export const LoginUser = async (email, password, setUserId, setUser, setUserLoading, setUserError) => {
    const url = PersonalServicesEndPoints.LOGIN_URL;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Login failed with status: ${response.status}`);
        }

        const userData = await response.json();

        if (userData) {
            localStorage.setItem('userId', userData.token);
            setUserId(userData.token);
            alert("Login successful! 🎉");
            getUserIsLogined(userData.token, setUser, setUserLoading, setUserError);
            return userData;
        } else {
            alert("Invalid credentials. Please try again.");
            return null;
        }
    } catch (error) {
        console.error('Login error:', error);
        alert(`Login failed: ${error.message}`);
        setUserError(error.message);
        return null;
    }
};

export const forgotPassword = async (email) => {

    const url = PersonalServicesEndPoints.FORGOT_PASSWORD_URL;
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email

            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        return users
        // if (users.length > 0) {
        //     return users[0];
        // } else {
        //     alert("Invalid email. Please try again.");
        //     return null;
        // }
    } catch (error) {
        alert('Error logging in, Check the server connection', error.message);
    }
};

export const UpdatePassword = async (formData) => {
    const url = PersonalServicesEndPoints.RESET_PASSWORD;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.Email,
                token: formData.Code,
                newPassword: formData.Password,
            }),
        });

        // تحقق من نوع المحتوى أولاً
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
            // إذا لم يكن الرد JSON
            if (response.ok) {
                return { success: true, message: 'Password updated successfully' };
            } else {
                const text = await response.text();
                throw new Error(text || 'Failed to update password');
            }
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update password');
        }

        return {
            success: true,
            data: data
        };

    } catch (error) {
        console.error('Error updating password:', error);
        return {
            success: false,
            error: error.message || 'Error updating password. Please try again.'
        };
    }
};

export const getPCBS = async (userId, setHistory, setUserHistoryLoading, setUserHistoryError) => {

    const url = PersonalServicesEndPoints.GET_USER_HISTORY;
    setUserHistoryLoading(true);
    try {
        const token = `Bearer ${localStorage.getItem('userId')}`;
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
            throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
        }
        const data = await response.json();
        //#region Cancel comment when connecting to the backend
        // setHistory(data);
        const adaptResponse = adaptBackendResponse(data);
        setHistory(adaptResponse);
        //#endregion

    } catch (error) {
        console.error('Error fetching PCB history:', error.message);
        setUserHistoryError(error.message);
    } finally {
        setUserHistoryLoading(false);
    }
};


//#region Adapt Backend Response
function adaptBackendResponse(backendData) {
    // if (!Array.isArray(backendData)) {
    //     backendData = [backendData];
    // }
    // console.log("backendData " + backendData);
    const groupedData = {};
    // groupedData = {
    //     groupId: {
    //         id: groupId,
    //         image1: '',
    //         image2: '',
    //         Defects: null,
    //         Components: null,
    //         createdAt: item.createdAt
    //     },
    //     groupId: {
    //         id: groupId,
    //         image1: '',
    //         image2: '',
    //         Defects: null,
    //         Components: null,
    //         createdAt: item.createdAt
    //     },
    // }

    backendData.forEach(item => {
        try {
            const parsedJson = item.resultJson ? JSON.parse(item.resultJson) : {};
            const groupId = item.groupId;

            if (!groupId) return;

            if (!groupedData[groupId]) {
                groupedData[groupId] = {
                    id: groupId,
                    image1: '',
                    image2: '',
                    Defects: null,
                    Components: null,
                    createdAt: item.createdAt
                };
            }


            if (Object.keys(parsedJson).length === 0) {
                groupedData[groupId].Defects = {
                    statistics: {},
                    detections: {}
                };
                if (item.imagePath && !groupedData[groupId].image1) {
                    groupedData[groupId].image1 = item.imagePath;
                }
            } else if (parsedJson.components) {
                groupedData[groupId].Components = {
                    statistics: parsedJson.statistics || {},
                    components: parsedJson.components || {}
                };
                if (item.imagePath && !groupedData[groupId].image2) {
                    groupedData[groupId].image2 = item.imagePath;
                }
            } else if (parsedJson.detections) {
                groupedData[groupId].Defects = {
                    statistics: parsedJson.statistics || {},
                    detections: parsedJson.detections || {}
                };
                if (item.imagePath && !groupedData[groupId].image1) {
                    groupedData[groupId].image1 = item.imagePath;
                }
            }
        } catch (error) {
            console.error('Error processing item:', item, error);
        }
    });
    // console.log(Object.values(groupedData));
    return Object.values(groupedData);
}


//#endregion