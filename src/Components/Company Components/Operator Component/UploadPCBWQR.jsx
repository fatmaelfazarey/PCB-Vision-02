import React, { useContext, useState, useEffect } from 'react';
import AddPCBImage from '../../../Shared/AddPCBImage';
import QRcode from './QRcode';
import { AppContext } from '../../../Context/AppContext';
import { AddNewPCB } from '../../../Services/SharedServices';
import { handleDefectsDetection, handleComponentsDetection } from '../../../Services/AIRequestService';
import { GetCurrentDateTime } from '../../../assets/assets';
import Loading from '../../../Shared/Loading/Loading';
import Toast from '../../../Shared/Toast/Toast';

const UploadPCBWQR = ({ employeeId, Line_ID }) => {
    const { t } = useContext(AppContext);
    const [isFormUpdated, setIsFormUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [formData, setFormData] = useState({
        image1: '',
        image2: '',
        Operator_ID: employeeId,
        Line_ID: Line_ID,
        Engineer_ID: '',
        CreatedAt: '',
        SN: '',
        Defects: null,
        Components: null,
        Pass_Fail: {
            Modified_By: null,
            Status: 'Pending',
            Modified_Time: null
        },
        Repaired: {
            Flag: '"Yes | No"',
            Time: null
        }
    });

    // Function to show Toast
    const handleShowToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    // Function to close Toast
    const handleCloseToast = () => {
        setShowToast(false);
    };

    // Function to handle image upload
    const handleImageUpload = (fieldName, value) => {
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    // Function to set default form data
    const setDefaultData = () => {
        formData.Operator_ID = employeeId;
        formData.Line_ID = Line_ID;
        setFormData(prevState => ({
            ...prevState,
            CreatedAt: GetCurrentDateTime(),
            Operator_ID: employeeId,
            Line_ID: Line_ID,
        }));
    };

    // Function to validate form inputs
    const validateForm = () => {
        if (!formData.Operator_ID) {
            handleShowToast(t('Sorry, an error occurred. Try again later'));
            return false;
        }

        if (!formData.SN) {
            handleShowToast(t('Enter the serial number.'));
            return false;
        }

        if (!formData.image1 && !formData.image2) {
            handleShowToast(t('Unacceptable value. Try again'));
            return false;
        }

        return true;
    };

    const saveData = async () => {
        if (!formData.image2 && Object.keys(formData.Defects.statistics).length === 0) {
            formData.Pass_Fail.Status = 'Pass';
            formData.Pass_Fail.Modified_By = 'No Defects';
        }
        try {
            await AddNewPCB(formData, true);
            if (!formData.image2 && Object.keys(formData.Defects.statistics).length === 0) {
                handleShowToast(t(`PCB Pass with no defects.`));
            } else {
                handleShowToast(t('PCB is Pending.'));
            }

        } catch (error) {
            console.error('Error:', error);
            handleShowToast(t('Failed to save data.'));
        } finally {
            setIsFormUpdated(false); // Reset form update state
        }
    };

    // useEffect to save data when form is updated
    useEffect(() => {
        if (isFormUpdated) {
            saveData();
        }
    }, [isFormUpdated, formData, t]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDefaultData();

        if (!validateForm()) return;

        setIsLoading(true); // Show loading spinner
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top

        try {
            if (formData.image1 && !formData.image2) {
                await handleDefectsDetection(formData.image1, setFormData, true);
            } else if (!formData.image1 && formData.image2) {
                await handleComponentsDetection(formData.image2, setFormData, true);
            } else if (formData.image1 && formData.image2) {
                await handleDefectsDetection(formData.image1, setFormData, true);
                await handleComponentsDetection(formData.image2, setFormData, true);
            }

            setIsFormUpdated(true); // Trigger data saving
        } catch (error) {
            console.error('Error:', error);
            handleShowToast(t('Failed to process data.'));
        } finally {
            setIsLoading(false); // Hide loading spinner
        }
    };

    // Function to reset the form
    const resetForm = () => {
        window.location.reload();
    };

    return (
        <form className='max-w-screen-xl mx-auto pt-7 pb-7 flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
            {/* Show Toast if visible */}
            {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}

            {/* Show Loading spinner if loading */}
            {isLoading && <Loading />}

            {/* Image upload section */}
            <div className="flex flex-col lg:flex-row gap-3 w-full items-center justify-center">
                <AddPCBImage image='image1' onImageUpload={handleImageUpload} />
                <AddPCBImage image='image2' onImageUpload={handleImageUpload} />
            </div>

            {/* QR code section */}
            <div className='flex justify-center align-middle'>
                <QRcode SN='SN' onSNUpload={handleImageUpload} />
            </div>

            {/* Form actions (Reset and Submit) */}
            <div className="flex flex-row gap-3 w-full items-center justify-around">
                <input
                    type='reset'
                    value={t('Reset')}
                    onClick={resetForm}
                    className={`bg-white dark:bg-black text-main border font-bold py-2 px-6 rounded-xl transition hover:bg-main hover:opacity-100 hover:text-white hover:dark:text-black`}
                />
                <input
                    type='submit'
                    value={t('Submit')}
                    className={`border bg-main text-white dark:text-black font-bold py-2 px-6 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100`}
                />
            </div>
        </form>
    );
};

export default UploadPCBWQR;