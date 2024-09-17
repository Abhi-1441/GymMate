import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
            <div className="container mx-auto">
                <p>© {new Date().getFullYear()} Abhi-1441. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
