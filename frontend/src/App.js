import React from "react";
import { createBrowserRouter, Outlet, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
// import ReactDOM from "react-dom/client";
import Login from "./components/login";
import Signup from "./components/signup";
import Nav from './components/nav';
import Error from "./components/error";
import Chatbot from "./components/chatbot";
import ChatIcon from "./components/chatIcon";
import Homepage from "./components/hompage";
import Dashboard from "./components/dashboard";
// import { isVerified } from "../config/globalVariables";
import { Authorization } from "../config/globalVariables";


// const chatHistory = [];
const Page = () => {
    const location = useLocation();
    return (
        <>
            <Authorization>
                <Nav ></Nav>
                <Outlet />
                {(location.pathname !== '/chatbot') ? (<ChatIcon />) : (<></>)}
            </Authorization>

        </>
    );
}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Page />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/chatbot',
                element: <Chatbot />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ],
        errorElement: <Error />,
    }
])

export default appRouter;
