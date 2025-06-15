import React, { useState, useContext, useCallback } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { forgotPassword, UpdatePassword } from '../Services/UserService';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { language, t } = useContext(AppContext);

    // State management
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        Email: "",
        Phone: "",
        Password: "",
        ConfirmPassword: "",
    });
    const [isVerified, setIsVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Password validation pattern
    const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Handlers
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    // Validation
    const validate = useCallback(() => {
        const newErrors = {};

        if (!isVerified) {
            if (!formData.Email.trim()) newErrors.Email = t("Email is required");
            if (!formData.Phone.trim()) newErrors.Phone = t("Phone is required");
        } else {
            if (!formData.Password.trim()) {
                newErrors.Password = t("Password is required");
            } else if (!PasswordPattern.test(formData.Password)) {
                newErrors.Password = t("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
            }

            if (!formData.ConfirmPassword.trim()) {
                newErrors.ConfirmPassword = t("Please confirm your password");
            } else if (formData.Password !== formData.ConfirmPassword) {
                newErrors.ConfirmPassword = t("Passwords do not match");
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, isVerified, t]);

    // Form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validate()) {
            setIsSubmitting(false);
            return;
        }

        try {
            if (!isVerified) {
                const user = await forgotPassword(formData.Email, formData.Phone);
                if (user) {
                    setIsVerified(true);
                }
            } else {
                const user = await UpdatePassword(formData.Email, formData.Password, formData.ConfirmPassword);
                if (user) {
                    navigate('/login'); // Redirect to login after successful password update
                }
            }
        } catch (error) {
            console.error("Password update error:", error);
            setErrors({
                ...errors,
                serverError: t("Failed to update password. Please try again.")
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, isVerified, validate, navigate, t]);

    return (
        <div className="relative bg-second dark:bg-second-dark flex items-center h-screen">
            <div className={`h-screen absolute top-0 left-0 md:relative bg-white dark:bg-black shadow-lg sm:w-130 w-[90%] flex flex-col justify-center items-center p-5 ${language === 'ar' ? 'rounded-l-4xl' : 'rounded-r-4xl'}`}>
                <div className='text-center text-sub-text flex flex-col justify-center items-center'>
                    <img src={assets.logo} alt='pcb' loading="lazy" />
                    <p className='text-lg'>{t('Reset your password')}</p>
                </div>

                {errors.serverError && (
                    <div className="w-full p-2 mb-3 text-red-500 text-sm text-center">
                        {errors.serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col w-full gap-3 mt-4 mb-4 items-end'>
                    {!isVerified ? (
                        <>
                            {/* Email Field */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor="Email" className={`text-sub-text block text-sm`}>
                                    {t('Email')}
                                </label>
                                <input
                                    id='Email'
                                    name="Email"
                                    type='email'
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className={`w-full font-[400] dark:text-white rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark ${errors.Email ? 'border border-red-500' : ''}`}
                                    disabled={isSubmitting}
                                />
                                {errors.Email && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.Email}
                                    </span>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className='flex flex-col w-full'>
                                <label htmlFor="Phone" className={`text-sub-text block text-sm`}>
                                    {t('Phone')}
                                </label>
                                <div className='relative'>
                                    <input
                                        id='Phone'
                                        value={formData.Phone}
                                        name='Phone'
                                        onChange={handleChange}
                                        className={`w-full font-[400] dark:text-white rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark ${errors.Phone ? 'border border-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.Phone && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.Phone}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="Password" className={`text-sub-text block text-sm`}>
                                    {t('New Password')}
                                </label>
                                <div className='relative'>
                                    <input
                                        id='Password'
                                        type='text'
                                        value={formData.Password}
                                        name='Password'
                                        onChange={handleChange}
                                        className={`w-full font-[400] dark:text-white rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark ${errors.Password ? 'border border-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.Password && (
                                    <span className="text-red-500 text-xs mt-1 block">
                                        {errors.Password}
                                    </span>
                                )}
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor="ConfirmPassword" className={`text-sub-text block text-sm`}>
                                    {t('Confirm Password')}
                                </label>
                                <div className='relative'>
                                    <input
                                        id='ConfirmPassword'
                                        value={formData.ConfirmPassword}
                                        name="ConfirmPassword"
                                        type='text'
                                        onChange={handleChange}
                                        className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white ${errors.ConfirmPassword ? 'border border-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.ConfirmPassword && (
                                    <span className="text-red-500 text-xs mt-1 block">
                                        {errors.ConfirmPassword}
                                    </span>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className={`w-fit bg-transparent border text-main font-bold py-2 px-4 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? t('Processing...') : isVerified ? t('Update Password') : t('Verify Account')}
                    </button>
                </form>
            </div>

            <div className='w-full md:w-3/5 h-full overflow-hidden flex items-center'>
                <img src={assets.sign} alt="Sign in illustration" className="w-full h-full object-cover" loading="lazy"/>
            </div>
        </div>
    );
};

export default ForgotPassword;