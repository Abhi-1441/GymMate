import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import GoogleLogoutButton from './GoogleLogoutButton';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger menu

const Navbar = () => {
    const authToken = useSelector(state => state.auth.token);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center md:px-12 ">
                <div className='flex justify-center items-center space-x-1'>
                    <Link to="/">
                        <img src="GymMate.png" alt="" className='h-16' />
                    </Link>
                    <Link to="/" className="text-xl text-white hover:text-gray-400">GymMate</Link>
                </div>

                {/* Hamburger menu for mobile */}
                <button
                    className="sm:hidden text-2xl text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Links for larger screens */}
                <div className="hidden sm:flex space-x-4 items-start ">
                    <Link to="/" className="text-white hover:text-gray-400 hover:underline">Home</Link>
                    <Link to="/check-protein-requirement" className="text-white hover:text-gray-400 hover:underline">Protein Check</Link>
                    <Link to="/food" className="text-white hover:text-gray-400 hover:underline">Food</Link>
                    <Link to="/calendar" className="text-white hover:text-gray-400 hover:underline">Calendar</Link>
                    <Link to="/about" className="text-white hover:text-gray-400 hover:underline">About</Link>
                </div>

                {/* Google login/logout button */}
                <div className="hidden sm:block">
                    {!authToken ? <GoogleLoginButton /> : <GoogleLogoutButton />}
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden flex flex-col items-center space-y-4 mt-4">
                    <Link to="/" className="text-white hover:text-gray-400" onClick={toggleMenu}>Home</Link>
                    <Link to="/check-protein-requirement" className="text-white hover:text-gray-200" onClick={toggleMenu}>Protein Check</Link>
                    <Link to="/food" className="text-white hover:text-gray-400" onClick={toggleMenu}>Food</Link>
                    <Link to="/calendar" className="text-white hover:text-gray-400" onClick={toggleMenu}>Calendar</Link>
                    <Link to="/about" className="text-white hover:text-gray-400" onClick={toggleMenu}>About</Link>
                    {!authToken ? (
                        <GoogleLoginButton onClick={toggleMenu} />
                    ) : (
                        <GoogleLogoutButton onClick={toggleMenu} />
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
