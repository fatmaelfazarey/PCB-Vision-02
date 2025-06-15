import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets';
import SectionTitle from '../Section Title/SectionTitle';
import { AppContext } from '../../Context/AppContext';
import { submitFeedback } from '../../Services/SharedServices';
// import Toast from '../Toast/Toast';
import Toast from '../../Shared/Toast/Toast';
const Contact = () => {
    const { t } = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [showToast, setShowToast] = useState(false); // Toast visibility
    const [toastMessage, setToastMessage] = useState(''); // Toast message
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        Subject: "",
        message: "",

    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!emailReg.test(formData.email)) newErrors.email = "Invalid email format, username@example.com";
        if (!formData.Subject.trim()) newErrors.Subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Your message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                setIsSubmitted(true);
                await submitFeedback(formData);
                setFormData({
                    name: "",
                    email: "",
                    Subject: "",
                    message: "",
                });
                handleShowToast(t('Thank you for your feedback! Your input helps us improve and serve you better.'))
            } catch (error) {
                handleShowToast(error.message || t("Failed to submit feedback. Please try again."));
            } finally {

            }
        }
    };

    // Function to show Toast
    const handleShowToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };
    // Function to close Toast
    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-4 overflow-x-hidden " style={{ direction: "ltr" }}>
            {/* Show Toast if visible */}
            {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}

            <SectionTitle title='Your Opinion Matters to ' span='Us' />
            <div className={'flex flex-row w-full '}>
                <form onSubmit={handleSubmit} className={`w-full md:w-[65%]  flex flex-col gap-3 `}>
                    <div className={`flex gap-3 w-full`}>
                        <div className="flex flex-col w-full ">
                            <input
                                type='text'
                                placeholder={t('Name')}
                                name='name'
                                value={formData.name}
                                onChange={(e) => { handleChange(e); }}
                                className={`w-full font-[400] dark:text-white text-xl rounded-xl outline-0 caret-main p-4 bg-second dark:bg-second-dark`} />
                            {errors.name && <span className="text-red-500 text-[.6rem]">{t(errors.name)}</span>}
                        </div>
                        <div className="flex flex-col w-full">
                            <input
                                type='email'
                                placeholder={t('Email')}
                                name='email'
                                value={formData.email}
                                onChange={(e) => { handleChange(e); }}
                                className={`w-full font-[400] dark:text-white text-xl rounded-xl outline-0 caret-main p-4 bg-second dark:bg-second-dark`} />
                            {errors.email && <span className="text-red-500 text-[.6rem]">{t(errors.email)}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <input
                            type='text'
                            placeholder={t('Subject')}
                            name='Subject'
                            value={formData.Subject}
                            onChange={(e) => { handleChange(e); }}
                            className={`w-full rounded-xl font-[400] dark:text-white text-xl outline-0 caret-main p-4 bg-second dark:bg-second-dark`} />
                        {errors.Subject && <span className="text-red-500 text-[.6rem]">{t(errors.Subject)}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <textarea
                            placeholder={t('Your message')}
                            name='message'
                            value={formData.message}
                            onChange={(e) => { handleChange(e); }}
                            className={`w-full font-[400] dark:text-white text-xl rounded-xl outline-0 caret-main p-4 bg-second dark:bg-second-dark h-[250px] resize-none`} >
                        </textarea>
                        {errors.message && <span className="text-red-500 text-[.6rem]">{t(errors.message)}</span>}
                    </div>
                    <input
                        type="submit"
                        value={t('Send')}
                        className={` w-full pl-10 pr-10 font-[400] dark:text-white text-xl bg-transparent border text-main  py-2 px-4 rounded-xl opacity-90  hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black`} />
                </form>
                <div
                    className={`${isSubmitted ? 'feedbackMoveUp' : ''} w-[35%] transition-all duration-500  hidden md:flex`}
                    onAnimationEnd={() => setIsSubmitted(false)}
                >
                    <img src={assets.Sent_Message} alt="Message sent confirmation" loading="lazy" />
                </div>
            </div>
        </div >
    )
}

export default Contact
