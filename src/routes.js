// src/routes.js
import { lazy } from 'react';


const LandingPage = lazy(() => import('./Pages/LandingPage'));
const Login = lazy(() => import('./Pages/login'));
const Sign = lazy(() => import('./Pages/Sign'));
const Main = lazy(() => import('./Pages/Main'));
const Profile = lazy(() => import('./Pages/Profile'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const LoginAsCompany = lazy(() => import("./Pages/Company Pages/LoginAsCompany"));
const Operator = lazy(() => import("./Pages/Company Pages/Operator"));
const Engineer = lazy(() => import("./Pages/Company Pages/Engineer"));
const Dashboard = lazy(() => import("./Pages/Company Pages/Dashboard"));
const CompanyProfile = lazy(() => import("./Pages/Company Pages/CompanyProfile"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const NotAccess = lazy(() => import("./Pages/NotAccess"));

const Guest = lazy(() => import('./Pages/Guest'));


export const routes = [
    // Public Routes
    { path: '/', component: LandingPage, public: true },
    { path: 'guest', component: Guest, public: true },
    { path: '/login', component: Login, public: true },
    { path: '/sign', component: Sign, public: true },
    { path: '/forgot-password', component: ForgotPassword, public: true },
    { path: '/not-access', component: NotAccess, public: true },

    // User Protected Routes
    { path: '/main/:userId', component: Main, public: false },
    { path: '/profile/:userId', component: Profile, public: false },

    // Company Public Routes
    { path: '/login-company', component: LoginAsCompany, public: true, company: true },

    // Company Protected Routes
    { path: '/operator/:employeeId', component: Operator, public: false, company: true },
    { path: '/engineer/:employeeId', component: Engineer, public: false, company: true },
    { path: '/leader/:employeeId', component: Dashboard, public: false, company: true },
    { path: '/company-profile/:employeeId', component: CompanyProfile, public: false, company: true },

    // Catch-all Route
    { path: '*', component: NotFound, public: true }
];