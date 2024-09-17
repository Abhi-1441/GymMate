import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const PrivateRoute = () => {
    const authToken = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (!authToken) {
            toast.error('User must Login to use this functionality.');
        }
    }, [authToken]);

    return authToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;