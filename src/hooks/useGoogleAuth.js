import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export const useGoogleAuth = () => {
    const [token, setToken] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (response) => {
            setToken(response.access_token);
        },
        onError: () => console.error('Google login failed'),
    });

    return { login, token };
};
