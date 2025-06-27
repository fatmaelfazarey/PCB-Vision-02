
import { CallAIEndPoints } from "./EndPoints";
// Function to detect defects
export const handleDefectsDetection = async (image1, setFormData) => {
    try {
        const response = await detect_defects(image1);
        setFormData(prevState => ({
            ...prevState,
            Defects: response,
        }));

        return response;
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to get response from API.");
        throw error;
    }
};

// Function to detect components
export const handleComponentsDetection = async (image2, setFormData) => {
    try {
        const response = await detect_components(image2);
        setFormData(prevState => ({
            ...prevState,
            Components: response,
        }));
        return response;
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to get response from API.");
        throw error;
    }
};

export const detect_defects = async (imageBase64) => {

    // console.log(imageBase64);
    const url = CallAIEndPoints.DETECT_DEFECTS_URL;
    try {
        const token = `Bearer ${localStorage.getItem('userId')}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                image: imageBase64
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        alert('Error:', error)
        // console.error('Error:', error);
        throw error;
    }
};

export const detect_components = async (imageBase64) => {
    const url = CallAIEndPoints.DETECT_COMPONENTS_URL;
    try {
        const token = `Bearer ${localStorage.getItem('userId')}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                image: imageBase64
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert('Error:', error)
        throw error;
    }
};

export const handleDefectsAndComponents = async (image1, image2, setFormData) => {
    try {
        const response = await detect_defects_and_components(image1, image2);
        setFormData(prevState => ({
            ...prevState,
            Defects: response.Defects,
            Components: response.Components,
        }));
        return response;
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to get response from API.");
        throw error;
    }
};

export const detect_defects_and_components = async (imageBase64_1, imageBase64_2) => {
    const url = CallAIEndPoints.DETECT_DEFECTS_AND_COMPONENTS_URL;
    try {
        const token = `Bearer ${localStorage.getItem('userId')}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                image1: imageBase64_1,
                image2: imageBase64_2,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        alert('Error:', error)
        throw error;
    }
};


