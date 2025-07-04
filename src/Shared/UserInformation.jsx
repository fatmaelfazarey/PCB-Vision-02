import React, { useState, useContext, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast/Toast';
import { UpdateUserInfo } from '../Services/SharedServices';

const UserInformation = ({ id, isCompanyLogin, image, name, email, phone, Date_of_Birth, Line_ID, Password, isViewMode }) => {
    const { toggleMode, isDarkMode, t, setLanguage, language } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [showSettingsList, setShowSettingsList] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false); // Toast visibility
    const [toastMessage, setToastMessage] = useState(''); // Toast message
    const [userData, setUserData] = useState({
        Image: image || '',
        Name: name || '',
        Email: email || '',
        Phone: phone || '',
        Date_of_Birth: Date_of_Birth || '',
        Line_ID: Line_ID || '',
        Password: Password
    });

    const handleImageChange = (event) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setUserData({ ...userData, Image: e.target.result });
            };
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

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSettingsList(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}
            <div className='max-w-screen-xl mx-auto mb-7 flex flex-col sm:flex-row gap-2.5 items-start fixed_direction'>
                <div className={`flex w-full ${isEdit ? 'flex-col' : 'flex-row'}`}>
                    <div className={`flex flex-col sm:flex-row w-full gap-2`}>
                        <div className={`bg-second dark:bg-second-dark p-1 rounded-xl relative w-fit`}>
                            {isEdit ? (
                                <>
                                    <input type='file' accept='image/*' className='absolute top-0 left-0 w-full h-full opacity-0' onChange={handleImageChange} />
                                    <img loading="lazy" src={userData.Image || assets.add_user} alt='user' id='userImage' className={`w-30 max-w-96 aspect-auto rounded-xl`} />
                                </>
                            ) : (
                                <img loading="lazy" src={userData.Image || assets.user_icon} alt='user' id='userImage' className={`w-52 max-w-96 aspect-auto rounded-xl`} />
                            )}
                        </div>
                        <div className={`w-full`}>
                            {isEdit ? (
                                <div className='flex flex-col gap-2'>
                                    <input
                                        type="text"
                                        value={userData.Name || ''}
                                        className={`font-bold text-black dark:text-second text-3xl w-fit`}
                                        onChange={(e) => setUserData({ ...userData, Name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        value={userData.Email || ''}
                                        className={`font-[400] text-[18px] text-title w-fit`}
                                        onChange={(e) => setUserData({ ...userData, Email: e.target.value })}
                                    />
                                    {!isCompanyLogin && (
                                        <>
                                            <input
                                                type='tel'
                                                value={userData.Phone || '01234567890'}
                                                className={`font-[400] text-[18px] text-title w-fit`}
                                                onChange={(e) => setUserData({ ...userData, Phone: e.target.value })}
                                            />
                                            <input
                                                type='text'
                                                value={userData.Date_of_Birth || ''}
                                                className={`font-[400] text-[18px] text-title w-fit`}
                                                onChange={(e) => setUserData({ ...userData, Date_of_Birth: e.target.value })}
                                            />
                                        </>
                                    )}

                                    {/* {!isCompanyLogin && (
                                        <input
                                            type="tel"
                                            value={userData.Phone || ''}
                                            className={`font-[400] text-[18px] text-title w-fit`}
                                            onChange={(e) => setUserData({ ...userData, Phone: e.target.value })}
                                        />
                                    )} */}
                                </div>
                            ) : (
                                <div>
                                    <p className={`font-bold text-3xl text-black dark:text-second`}>{userData.Name || 'User Name'}</p>
                                    <p className={`font-[400] text-[18px] text-title`}>{userData.Email || 'test.user@example.com'}</p>
                                    {!isCompanyLogin && (
                                        <p className={`font-[400] text-[18px] text-title`}>{userData.Phone || '01234567890'}</p>
                                    )}

                                    {Date_of_Birth && (
                                        <p className={`font-[400] text-[18px] text-title`}>Date of Birth: <span className={`text-[#696969]`}>{userData.Date_of_Birth || 'dd-mm-yyyy'}</span></p>
                                    )}
                                    {Line_ID && (
                                        <p className={`font-[400] text-[18px] text-title`}>Line: <span className={`text-[#696969]`}>{Line_ID}</span></p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`flex items-start ${isEdit ? 'justify-end' : ''}`}>
                        {isEdit ? (
                            <button
                                onClick={() => { setIsEdit(false); UpdateUserInfo(isCompanyLogin, id, userData, setShowToast, handleShowToast); }}
                                className={`bg-white dark:bg-black text-main border font-bold py-2 px-4 rounded-xl transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black`}
                            >
                                {t('Save')}
                            </button>
                        ) : <>{!isViewMode && (
                            <div className={`relative`} ref={dropdownRef}>
                                <svg
                                    onClick={() => setShowSettingsList(!showSettingsList)}
                                    className={`w-9 h-fit hover:fill-main fill-sub-text hover:rotate-90`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 80 80"

                                >
                                    <path d="M36.324219 6L34.050781 11.675781C30.46875 12.425781 27.136719 13.828125 24.171875 15.765625L18.558594 13.359375L13.359375 18.558594L15.765625 24.171875C13.824219 27.136719 12.425781 30.46875 11.675781 34.050781L6 36.324219L6 43.675781L11.675781 45.949219C12.425781 49.53125 13.828125 52.863281 15.765625 55.828125L13.359375 61.441406L18.558594 66.640625L24.171875 64.234375C27.136719 66.175781 30.46875 67.574219 34.050781 68.324219L36.324219 74L43.675781 74L45.949219 68.324219C49.53125 67.574219 52.863281 66.171875 55.828125 64.234375L61.441406 66.640625L66.640625 61.441406L64.234375 55.828125C66.175781 52.863281 67.574219 49.53125 68.324219 45.949219L74 43.675781L74 36.324219L68.324219 34.050781C67.574219 30.46875 66.171875 27.136719 64.234375 24.171875L66.640625 18.558594L61.441406 13.359375L55.828125 15.765625C52.863281 13.824219 49.53125 12.425781 45.949219 11.675781L43.675781 6ZM37.675781 8L42.324219 8L44.46875 13.371094L45.011719 13.46875C48.738281 14.171875 52.199219 15.632813 55.21875 17.699219L55.671875 18.003906L60.984375 15.730469L64.269531 19.015625L61.992188 24.328125L62.300781 24.78125C64.367188 27.800781 65.828125 31.257813 66.527344 34.988281L66.628906 35.53125L72 37.675781L72 42.324219L66.628906 44.46875L66.53125 45.011719C65.828125 48.738281 64.367188 52.199219 62.300781 55.21875L61.996094 55.671875L64.269531 60.984375L60.984375 64.269531L55.671875 61.992188L55.21875 62.300781C52.199219 64.367188 48.742188 65.828125 45.011719 66.527344L44.46875 66.628906L42.324219 72L37.675781 72L35.53125 66.628906L34.988281 66.53125C31.261719 65.828125 27.800781 64.367188 24.78125 62.300781L24.328125 61.996094L19.015625 64.269531L15.730469 60.984375L18.007813 55.671875L17.699219 55.21875C15.632813 52.199219 14.171875 48.742188 13.472656 45.011719L13.371094 44.46875L8 42.324219L8 37.675781L13.371094 35.53125L13.46875 34.988281C14.171875 31.261719 15.632813 27.800781 17.699219 24.78125L18.003906 24.328125L15.730469 19.015625L19.015625 15.730469L24.328125 18.007813L24.78125 17.699219C27.800781 15.632813 31.257813 14.171875 34.988281 13.472656L35.53125 13.371094ZM40 21C39.449219 21 39 21.449219 39 22C39 22.550781 39.449219 23 40 23C40.550781 23 41 22.550781 41 22C41 21.449219 40.550781 21 40 21ZM35.347656 21.613281C35.324219 21.613281 35.300781 21.613281 35.28125 21.613281C35.210938 21.621094 35.148438 21.628906 35.082031 21.648438C34.546875 21.792969 34.230469 22.339844 34.375 22.875C34.519531 23.40625 35.066406 23.722656 35.597656 23.578125C36.132813 23.4375 36.449219 22.890625 36.308594 22.355469C36.191406 21.921875 35.800781 21.617188 35.347656 21.613281ZM44.652344 21.613281C44.203125 21.617188 43.808594 21.921875 43.691406 22.355469C43.550781 22.890625 43.867188 23.4375 44.402344 23.578125C44.933594 23.722656 45.480469 23.40625 45.625 22.875C45.769531 22.339844 45.453125 21.792969 44.917969 21.648438C44.832031 21.625 44.742188 21.613281 44.652344 21.613281ZM30.976563 23.410156C30.808594 23.414063 30.644531 23.460938 30.5 23.546875C30.269531 23.675781 30.101563 23.894531 30.03125 24.152344C29.964844 24.410156 30 24.683594 30.132813 24.910156C30.265625 25.140625 30.484375 25.308594 30.742188 25.378906C30.996094 25.445313 31.269531 25.410156 31.5 25.277344C31.976563 25 32.140625 24.390625 31.863281 23.910156C31.683594 23.59375 31.34375 23.402344 30.976563 23.410156ZM48.953125 23.414063C48.613281 23.429688 48.304688 23.617188 48.132813 23.910156C48 24.140625 47.964844 24.414063 48.03125 24.671875C48.101563 24.929688 48.269531 25.148438 48.5 25.28125C48.976563 25.554688 49.589844 25.390625 49.863281 24.910156C50.140625 24.433594 49.976563 23.824219 49.5 23.546875C49.332031 23.449219 49.144531 23.40625 48.953125 23.414063ZM27.285156 26.269531C27.015625 26.269531 26.753906 26.375 26.5625 26.5625C26.175781 26.953125 26.175781 27.589844 26.5625 27.980469C26.953125 28.367188 27.589844 28.367188 27.980469 27.980469C28.367188 27.589844 28.367188 26.953125 27.980469 26.5625C27.792969 26.378906 27.546875 26.273438 27.285156 26.269531ZM52.742188 26.269531C52.472656 26.265625 52.210938 26.371094 52.019531 26.5625C51.628906 26.953125 51.628906 27.589844 52.019531 27.980469C52.410156 28.367188 53.042969 28.367188 53.433594 27.980469C53.824219 27.589844 53.824219 26.953125 53.433594 26.5625C53.25 26.378906 53.003906 26.277344 52.742188 26.269531ZM55.5625 30C55.394531 30.003906 55.230469 30.050781 55.085938 30.132813C54.855469 30.265625 54.6875 30.484375 54.621094 30.742188C54.550781 30.996094 54.585938 31.269531 54.71875 31.5C54.996094 31.976563 55.609375 32.140625 56.085938 31.863281C56.5625 31.589844 56.730469 30.976563 56.453125 30.5C56.269531 30.183594 55.929688 29.992188 55.5625 30ZM24.363281 30C24.023438 30.019531 23.714844 30.207031 23.546875 30.5C23.410156 30.730469 23.375 31.003906 23.445313 31.257813C23.515625 31.515625 23.683594 31.734375 23.910156 31.867188C24.390625 32.144531 25 31.976563 25.277344 31.5C25.554688 31.023438 25.390625 30.410156 24.910156 30.136719C24.746094 30.039063 24.554688 29.992188 24.363281 30ZM40 32C35.59375 32 32 35.59375 32 40C32 44.40625 35.59375 48 40 48C44.40625 48 48 44.40625 48 40C48 35.59375 44.40625 32 40 32ZM40 34C43.324219 34 46 36.675781 46 40C46 43.324219 43.324219 46 40 46C36.675781 46 34 43.324219 34 40C34 36.675781 36.675781 34 40 34ZM22.605469 34.34375C22.152344 34.347656 21.761719 34.648438 21.644531 35.082031C21.503906 35.617188 21.820313 36.164063 22.355469 36.308594C22.886719 36.453125 23.433594 36.136719 23.578125 35.601563C23.722656 35.066406 23.40625 34.519531 22.871094 34.375C22.785156 34.351563 22.695313 34.339844 22.605469 34.34375ZM57.394531 34.34375C57.371094 34.339844 57.347656 34.34375 57.324219 34.34375C57.257813 34.347656 57.191406 34.359375 57.125 34.375C56.59375 34.519531 56.277344 35.066406 56.421875 35.601563C56.5625 36.136719 57.109375 36.453125 57.644531 36.308594C58.179688 36.164063 58.496094 35.617188 58.351563 35.082031C58.234375 34.648438 57.84375 34.347656 57.394531 34.34375ZM22 39C21.449219 39 21 39.449219 21 40C21 40.550781 21.449219 41 22 41C22.550781 41 23 40.550781 23 40C23 39.449219 22.550781 39 22 39ZM58 39C57.449219 39 57 39.449219 57 40C57 40.550781 57.449219 41 58 41C58.550781 41 59 40.550781 59 40C59 39.449219 58.550781 39 58 39ZM22.652344 43.660156C22.550781 43.65625 22.449219 43.667969 22.355469 43.691406C21.820313 43.835938 21.503906 44.382813 21.644531 44.917969C21.789063 45.453125 22.335938 45.769531 22.871094 45.625C23.40625 45.480469 23.722656 44.933594 23.578125 44.402344C23.464844 43.976563 23.089844 43.675781 22.652344 43.660156ZM57.375 43.660156C56.925781 43.664063 56.535156 43.96875 56.421875 44.402344C56.351563 44.660156 56.386719 44.933594 56.519531 45.160156C56.652344 45.390625 56.871094 45.558594 57.128906 45.625C57.664063 45.769531 58.210938 45.453125 58.355469 44.921875C58.496094 44.386719 58.179688 43.839844 57.644531 43.695313C57.558594 43.671875 57.46875 43.660156 57.375 43.660156ZM24.390625 48C24.222656 48.003906 24.058594 48.046875 23.910156 48.132813C23.433594 48.410156 23.269531 49.019531 23.546875 49.5C23.675781 49.726563 23.894531 49.894531 24.152344 49.964844C24.410156 50.035156 24.683594 50 24.910156 49.863281C25.140625 49.734375 25.308594 49.515625 25.378906 49.257813C25.445313 49 25.410156 48.726563 25.277344 48.5C25.09375 48.179688 24.753906 47.988281 24.390625 48ZM55.542969 48.003906C55.199219 48.019531 54.890625 48.207031 54.71875 48.5C54.585938 48.730469 54.550781 49.003906 54.621094 49.261719C54.691406 49.519531 54.859375 49.738281 55.089844 49.871094C55.566406 50.144531 56.175781 49.980469 56.453125 49.5C56.730469 49.023438 56.566406 48.414063 56.089844 48.136719C55.921875 48.039063 55.730469 47.996094 55.542969 48.003906ZM27.285156 51.730469C27.015625 51.726563 26.753906 51.832031 26.5625 52.019531C26.175781 52.410156 26.175781 53.046875 26.5625 53.4375C26.953125 53.824219 27.589844 53.824219 27.980469 53.4375C28.367188 53.046875 28.367188 52.410156 27.980469 52.019531C27.792969 51.835938 27.546875 51.730469 27.285156 51.730469ZM52.742188 51.730469C52.472656 51.722656 52.210938 51.828125 52.019531 52.019531C51.628906 52.410156 51.628906 53.046875 52.019531 53.4375C52.410156 53.824219 53.042969 53.824219 53.433594 53.4375C53.824219 53.046875 53.824219 52.410156 53.433594 52.019531C53.25 51.835938 53.003906 51.734375 52.742188 51.730469ZM48.972656 54.589844C48.808594 54.589844 48.644531 54.636719 48.5 54.71875C48.019531 54.996094 47.855469 55.609375 48.132813 56.085938C48.410156 56.5625 49.019531 56.730469 49.5 56.453125C49.726563 56.320313 49.894531 56.101563 49.964844 55.84375C50.035156 55.589844 50 55.316406 49.863281 55.085938C49.683594 54.769531 49.339844 54.578125 48.972656 54.589844ZM30.953125 54.589844C30.609375 54.605469 30.300781 54.792969 30.132813 55.089844C29.855469 55.566406 30.019531 56.179688 30.5 56.453125C30.726563 56.589844 31 56.625 31.257813 56.554688C31.515625 56.488281 31.734375 56.320313 31.863281 56.089844C32 55.859375 32.035156 55.585938 31.964844 55.332031C31.894531 55.074219 31.726563 54.855469 31.5 54.722656C31.332031 54.625 31.140625 54.582031 30.953125 54.589844ZM35.332031 56.390625C34.882813 56.394531 34.492188 56.695313 34.375 57.128906C34.230469 57.664063 34.546875 58.210938 35.082031 58.355469C35.617188 58.5 36.164063 58.183594 36.308594 57.648438C36.375 57.390625 36.339844 57.117188 36.207031 56.886719C36.074219 56.660156 35.855469 56.492188 35.597656 56.421875C35.511719 56.398438 35.421875 56.386719 35.332031 56.390625ZM44.699219 56.390625C44.597656 56.386719 44.496094 56.394531 44.402344 56.421875C43.867188 56.566406 43.550781 57.113281 43.691406 57.644531C43.835938 58.179688 44.382813 58.496094 44.917969 58.355469C45.453125 58.210938 45.769531 57.664063 45.625 57.128906C45.511719 56.707031 45.136719 56.40625 44.699219 56.390625ZM40 57C39.449219 57 39 57.449219 39 58C39 58.550781 39.449219 59 40 59C40.550781 59 41 58.550781 41 58C41 57.449219 40.550781 57 40 57Z"></path>
                                </svg>
                                {showSettingsList && (
                                    <ul
                                        onClick={() => setShowSettingsList(false)}
                                        className={`absolute bg-second dark:bg-second-dark right-[100%]  top-[50%] w-[180px] rounded-xl overflow-hidden`}
                                    >
                                        <li
                                            onClick={() => {
                                                const newLanguage = language === 'en' ? 'ar' : 'en';
                                                setLanguage(newLanguage);
                                            }}
                                            className={`px-4 py-2 cursor-pointer  font-medium transition text-[#777777] hover:bg-main hover:text-white  rounded-[4px]`}
                                        >
                                            {t('العربيه')}
                                        </li>
                                        <li
                                            onClick={toggleMode}
                                            className={`px-4 py-2 cursor-pointer  font-medium transition text-[#777777] hover:bg-main hover:text-white  rounded-[4px]`}
                                        >
                                            {t(isDarkMode ? 'Light Mode' : 'Dark Mode')}
                                        </li>
                                        <li
                                            className={`px-4 py-2 cursor-pointer  font-medium transition text-[#777777] hover:bg-main hover:text-white  rounded-[4px]`}
                                            onClick={() => setIsEdit(true)}
                                        >
                                            {t('Edit')}
                                        </li>
                                        <li
                                            onClick={() => {
                                                if (localStorage.getItem('userId')) {
                                                    localStorage.removeItem('userId');
                                                } else if (localStorage.getItem('employeeId')) {
                                                    localStorage.removeItem('employeeId');
                                                }
                                                if (localStorage.getItem('role')) {
                                                    localStorage.removeItem('role');
                                                }
                                                navigate('/');
                                            }}
                                            className={`px-4 py-2 cursor-pointer  font-medium transition text-[#777777] hover:bg-main hover:text-white  rounded-[4px]`}
                                        >
                                            {t('Log out')}
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}</>}
                    </div>
                </div>
            </div>
        </>

    );
};

export default UserInformation;