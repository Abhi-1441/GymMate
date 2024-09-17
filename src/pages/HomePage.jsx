import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <div className="w-full flex justify-center items-center md:py-8 ">
            <div className="h-auto w-full sm:w-3/4 md:w-1/2 lg:w-5/12 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-8 sm:p-12 border rounded-lg shadow-md">
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold mb-4 text-blue-600 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Welcome to Food Tracker
                </motion.h1>

                <motion.p
                    className="mb-8 text-gray-700 text-center max-w-xs sm:max-w-md"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Manage your food intake, track your nutritional goals, and achieve a healthier lifestyle efficiently with our tools.
                </motion.p>

                <motion.div
                    className="flex flex-col space-y-4 w-full max-w-xs sm:max-w-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <Link to="/check-protein-requirement">
                        <motion.div
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-lg text-center font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Check Protein Requirement
                        </motion.div>
                    </Link>

                    <Link to="/calendar">
                        <motion.div
                            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg text-center font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Calendar
                        </motion.div>
                    </Link>

                    <Link to="/food">
                        <motion.div
                            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg text-center font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Manage Food Intake
                        </motion.div>
                    </Link>

                    <Link to="/about">
                        <motion.div
                            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg text-center font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            About Us
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default HomePage;
