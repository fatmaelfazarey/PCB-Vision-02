import { assets } from '../assets/assets';

const SecondHeader = ({ image, isCompanyLogin, onClick }) => {
    return (
        <div className="pt-4 fixed_direction">
            <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4 rounded-xl bg-second dark:bg-second-dark">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={assets.logo} className="h-15" alt="Logo" loading="lazy" />
                </a>
                <div id="navbar-menu rounded-xl">
                    <button
                        onClick={onClick}
                        className="focus:outline-none cursor-pointer"
                        aria-label={image ? "View or close profile" : "Default profile icon"}
                    >
                        {image ? (
                            <img
                                loading="lazy"
                                src={image}
                                className="bg-white dark:bg-black rounded-full p-1.5 h-[60px]"
                                width="60"
                                alt="Profile"
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 50 50" className="bg-white rounded-full p-2.5 w-[60px] h-[60px]">
                                <path fill="green" d="m15.3 37.3l-1.8-.8c.5-1.2 2.1-1.9 3.8-2.7s3.8-1.7 3.8-2.8v-1.5c-.6-.5-1.6-1.6-1.8-3.2c-.5-.5-1.3-1.4-1.3-2.6c0-.7.3-1.3.5-1.7c-.2-.8-.4-2.3-.4-3.5c0-3.9 2.7-6.5 7-6.5c1.2 0 2.7.3 3.5 1.2c1.9.4 3.5 2.6 3.5 5.3c0 1.7-.3 3.1-.5 3.8c.2.3.4.8.4 1.4c0 1.3-.7 2.2-1.3 2.6c-.2 1.6-1.1 2.6-1.7 3.1V31c0 .9 1.8 1.6 3.4 2.2c1.9.7 3.9 1.5 4.6 3.1l-1.9.7c-.3-.8-1.9-1.4-3.4-1.9c-2.2-.8-4.7-1.7-4.7-4v-2.6l.5-.3s1.2-.8 1.2-2.4v-.7l.6-.3c.1 0 .6-.3.6-1.1c0-.2-.2-.5-.3-.6l-.4-.4l.2-.5s.5-1.6.5-3.6c0-1.9-1.1-3.3-2-3.3h-.6l-.3-.5c0-.4-.7-.8-1.9-.8c-3.1 0-5 1.7-5 4.5c0 1.3.5 3.5.5 3.5l.1.5l-.4.5c-.1 0-.3.3-.3.7c0 .5.6 1.1.9 1.3l.4.3v.5c0 1.5 1.3 2.3 1.3 2.4l.5.3v2.6c0 2.4-2.6 3.6-5 4.6c-1.1.4-2.6 1.1-2.8 1.6" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default SecondHeader;