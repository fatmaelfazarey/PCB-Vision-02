import React, { useRef, useState, useEffect, Suspense, lazy } from 'react'
const Loading = lazy(() => import('../Shared/Loading/Loading'));
const Header = lazy(() => import('../Components/Landing Page/Header'));
const Home = lazy(() => import('../Components/Landing Page/Home'));
const About = lazy(() => import('../Components/Landing Page/About'));
const Services = lazy(() => import('../Components/Landing Page/Services'));
const Contact = lazy(() => import('../Components/Landing Page/Contact'));
const Footer = lazy(() => import('../Components/Landing Page/Footer'));
import { Navigate } from 'react-router-dom';
// import { assets } from '../assets/assets';

const LandingPage = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (homeRef.current) {
                const homeHeight = homeRef.current.offsetHeight;
                setShowScrollButton(window.scrollY > homeHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (localStorage.getItem('employeeId') && localStorage.getItem('role')) {
        return <Navigate to={`/${localStorage.getItem('role')}/${localStorage.getItem('employeeId')}`} state={{ path: location.pathname }} />
    } else if (localStorage.getItem('userId')) {
        return <Navigate to={`/main/${localStorage.getItem('userId')}`} state={{ path: location.pathname }} />
    }

    const scrollToSection = (section) => {
        if (section === "#home") {
            homeRef.current?.scrollIntoView({ behavior: "smooth" });
        } else if (section === "#about") {
            aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        } else if (section === "#services") {
            servicesRef.current?.scrollIntoView({ behavior: "smooth" });
        } else if (section === "#contact") {
            contactRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Suspense fallback={<Loading />}>
            <div>
                <Header scrollToSection={scrollToSection} />
                <div ref={homeRef}>
                    <Home />
                </div>
                <div>
                    <div ref={aboutRef} className=''>
                        <About />
                    </div>
                    <div ref={servicesRef}>
                        <Services />
                    </div>
                    <div ref={contactRef}>
                        <Contact />
                    </div>
                    <Footer scrollToSection={scrollToSection} />

                    {showScrollButton && (
                        <div
                            className="fixed bg-[#CADEC3] hover:bg-main right-6 bottom-6 z-50 p-3 rounded-[50%]"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            title='Back to top'
                        >
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">

                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                                <g id="SVGRepo_iconCarrier"> <path d="M5 19L11.2929 12.7071C11.6834 12.3166 12.3166 12.3166 12.7071 12.7071L19 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M5 11L11.2929 4.70711C11.6834 4.31658 12.3166 4.31658 12.7071 4.70711L19 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>

                            </svg>
                        </div>
                    )}
                </div>
            </div>

        </Suspense>

    )
}

export default LandingPage










