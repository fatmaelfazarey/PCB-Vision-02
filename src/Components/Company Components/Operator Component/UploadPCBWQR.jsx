import React, { useContext, useState, useEffect } from 'react';
import AddPCBImage from '../../../Shared/AddPCBImage';
import QRcode from './QRcode';
import { AppContext } from '../../../Context/AppContext';
import { AddNewPCB } from '../../../Services/SharedServices';
// import { handleDefectsDetection, handleComponentsDetection } from '../../../Services/AIRequestService';
// import { GetCurrentDateTime } from '../../../assets/assets';
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
        SN: '',
    }
    );

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


    // Function to validate form inputs
    const validateForm = () => {


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

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true); // Show loading spinner
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        const response = await AddNewPCB(formData, true);
        // alert(response);
        // console.log(response);

        if (!response.defectFlag) {
            handleShowToast(t(`PCB Pass with no defects.`));
        } else {
            handleShowToast(t('PCB is Pending.'));
        }
        setIsLoading(false);

    };

    // Function to reset the form
    const resetForm = () => {
        window.location.reload();
    };

    return (
        <form className='max-w-screen-xl mx-auto pt-7 pb-7 flex flex-col gap-3 w-full fixed_direction' onSubmit={handleSubmit}>
            {/* Show Toast if visible */}
            {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}

            {/* Show Loading spinner if loading */}
            {isLoading && <Loading />}

            {/* Image upload section */}
            <div className="flex flex-col lg:flex-row gap-3 w-full items-center justify-center fixed_direction">
                <AddPCBImage image='image1' onImageUpload={handleImageUpload} />
                <AddPCBImage image='image2' onImageUpload={handleImageUpload} />
            </div>

            {/* QR code section */}
            <div className='flex justify-center align-middle fixed_direction'>
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