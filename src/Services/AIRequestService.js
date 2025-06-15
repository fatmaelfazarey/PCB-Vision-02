
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
    const base64Data = imageBase64.split(',')[1]; // AI model does not need this part 'data:image/jpeg;base64,'
    const payload = {
        image: base64Data, //only base64 
    };
    const url = CallAIEndPoints.DETECT_DEFECTS_URL();
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
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
        // console.error('Error:', error);
        throw error;
    }
};

export const detect_components = async (imageBase64) => {
    const base64Data = imageBase64.split(',')[1]; // AI model does not need this part 'data:image/jpeg;base64,'
    const payload = {
        image: base64Data, //only base64 
    };
    const url = CallAIEndPoints.DETECT_COMPONENTS_URL();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


