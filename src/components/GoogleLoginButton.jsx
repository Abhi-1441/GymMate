import React from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../redux/slices/authSlice';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar',
        onSuccess: (tokenResponse) => {
            dispatch(setAuthToken(tokenResponse.access_token));
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        },
    });

    return (
        <button
            onClick={() => login()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
        >
            Login
        </button>
    );
};

export default GoogleLoginButton;
