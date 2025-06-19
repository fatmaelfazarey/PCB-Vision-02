import React, { useState, useEffect, useContext } from 'react';
import AddPCBImage from '../../Shared/AddPCBImage';
import { AppContext } from '../../Context/AppContext';
import { AddNewPCB } from '../../Services/SharedServices';
import { handleDefectsDetection, handleComponentsDetection } from '../../Services/AIRequestService';
import Response from './Response';

const UploadPCB = ({ isGuest }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState();
    const { userId, t } = useContext(AppContext);
    const [isFormUpdated, setIsFormUpdated] = useState(false); // Track form updates

    const [formData, setFormData] = useState({
        image1: '',
        image2: '',
        userId: userId,
        Defects: null,
        Components: null,
    });

    const handleImageUpload = (fieldName, value) => {
        setFormData(prevState => {
            const updatedState = { ...prevState, [fieldName]: value };
            return updatedState;
        });
    };

    const resetForm = () => {
        window.location.reload();
    };

    useEffect(() => {
        setFormData(prevState => ({ ...prevState, userId: userId }));
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.userId) {

            setLoading(true);
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            if (formData.image1 && !formData.image2) {

                await handleDefectsDetection(formData.image1, setFormData, false);

            } else if (!formData.image1 && formData.image2) {

                await handleComponentsDetection(formData.image2, setFormData, false);
            } else if (formData.image1 && formData.image2) {

                await handleDefectsDetection(formData.image1, setFormData, false);
                await handleComponentsDetection(formData.image2, setFormData, false);
            }
            // setResponseData(formData);

            setIsFormUpdated(true); // Trigger data saving
        }
        else if (isGuest) {

            setLoading(true);
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            if (formData.image1 && !formData.image2) {

                await handleDefectsDetection(formData.image1, setFormData, false);

            } else if (!formData.image1 && formData.image2) {

                await handleComponentsDetection(formData.image2, setFormData, false);
            } else if (formData.image1 && formData.image2) {

                await handleDefectsDetection(formData.image1, setFormData, false);
                await handleComponentsDetection(formData.image2, setFormData, false);
            }
            // setResponseData(formData);

            setIsFormUpdated(true); // Trigger data saving
        } else {
            alert(t('Sorry, an error occurred. Try again later'));
        }
    }
    const saveData = async () => {
        try {
            await AddNewPCB(formData, false);
            setResponseData(formData);

        } catch (e) {
            setError(e)
            console.error('Error:', e);

        } finally {
            setLoading(false);
            setIsFormUpdated(false); // Reset form update state
        }
    };

    // useEffect to save data when form is updated
    useEffect(() => {
        if (isFormUpdated) {
            setResponseData(formData);
            if (!isGuest) {
                saveData();
            } else {
                try {
                    setResponseData(formData);
                } catch (e) {
                    setError(e)
                    console.error('Error:', e);
                } finally {
                    setLoading(false);
                    setIsFormUpdated(false); // Reset form update state
                }
            }
        }
    }, [isFormUpdated, formData, t]);
    return (
        <>
            <form className='max-w-screen-xl mx-auto mt-7 mb-7 flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row  gap-3 w-full items-center justify-center">
                    <AddPCBImage
                        image='image1'
                        onImageUpload={handleImageUpload} />
                    <AddPCBImage
                        image='image2'
                        onImageUpload={handleImageUpload} />
                </div>
                <div className="flex flex-row gap-3 w-full items-center justify-evenly">
                    <input
                        type='reset'
                        value={t('Reset')}
                        onClick={resetForm}
                        
                        className={`bg-white dark:bg-black text-main border font-bold py-2 px-4 rounded-xl transition hover:bg-main hover:opacity-100 hover:text-white hover:dark:text-black `}
                    />
                    <input
                        type='submit'
                        value={t('Submit')}
                        className={` mr-2 border bg-main text-white dark:text-black font-bold py-2 px-4 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100 `}
                    />
                </div>
            </form>
            {<Response loading={loading} error={error} responseData={responseData} />}
        </>

    );
};

export default UploadPCB;

