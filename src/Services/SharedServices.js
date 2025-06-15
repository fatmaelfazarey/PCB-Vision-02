import { SharedServicesEndPoints } from "./EndPoints";

export const AddNewPCB = async (pcbData, isCompanyLogin) => {
    const url = isCompanyLogin ? SharedServicesEndPoints.ADD_NEW_PCB_COMPANY_URL() : SharedServicesEndPoints.ADD_NEW_PCB_USER_URL();
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pcbData),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add PCB: ${errorMessage}`);
        }
        let data = await response.json();

        return data;
    } catch (error) {
        console.error('Error adding PCB:', error.message);
        setError(error.message);
    }
};

export const DeletePCB = async (pcbId, isCompanyLogin) => {

    const url = isCompanyLogin
        ? SharedServicesEndPoints.DELETE_PCB_COMPANY_URL(pcbId)
        : SharedServicesEndPoints.DELETE_PCB_USER_URL(pcbId);
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete PCB: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting PCB:', error.message);
        throw error;
    }
};

export const UpdateUserInfo = async (isCompanyLogin, id, userData, setShowToast, handleShowToast) => {

    const url = isCompanyLogin
        ? SharedServicesEndPoints.UPDATE_USER_INFO_COMPANY_URL(id)
        : SharedServicesEndPoints.UPDATE_USER_INFO_USER_URL(id);

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update user: ${errorMessage}`);
        }

        const data = await response.json();
        setShowToast(true);
        handleShowToast('User updated successfully! 🎉');
    } catch (error) {
        console.error("Error updating user:", error.message);
    }
};


//#region GlobalServices == >Submit Feedback
// Submits feedback data to the JSON server API endpoint

export const submitFeedback = async (feedbackData) => {
    const url = SharedServicesEndPoints.SEND_FEEDBACK_URL();
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};
//#endregion