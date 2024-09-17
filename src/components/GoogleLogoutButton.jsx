import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAuthToken } from '../redux/slices/authSlice';
import { clearItems } from '../redux/slices/itemSlice';
import { persistor } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const GoogleLogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        persistor.purge().then(() => {
            // Refresh the page to reflect the purged state
            window.location.reload();
        });
        dispatch(clearItems());
        dispatch(clearAuthToken());
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
        >
            Logout
        </button>
    );
};

export default GoogleLogoutButton;
