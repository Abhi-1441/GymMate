import React, { useState } from 'react';

const CheckProteinRequirement = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [exerciseFrequency, setExerciseFrequency] = useState('');
    const [proteinRequirement, setProteinRequirement] = useState(null);

    // Function to calculate protein requirement
    const calculateProteinRequirement = () => {
        let baseProtein = 0.8; // base protein intake in grams per kg of body weight

        switch (exerciseFrequency) {
            case 'sedentary':
                baseProtein = 0.8; // Sedentary lifestyle
                break;
            case 'light':
                baseProtein = 1.0; // Light exercise
                break;
            case 'moderate':
                baseProtein = 1.2; // Moderate exercise
                break;
            case 'intense':
                baseProtein = 1.6; // Intense exercise
                break;
            default:
                baseProtein = 0.8; // Default to sedentary
                break;
        }

        // Calculate protein requirement
        const protein = (weight * baseProtein).toFixed(2); // Protein requirement in grams
        setProteinRequirement(protein);
    };

    return (
        <div className="p-6 md:p-8 lg:p-12 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Check Your Protein Requirement</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Weight Input */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Weight (kg):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your weight in kg"
                    />
                </div>

                {/* Height Input */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Height (cm):</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your height in cm"
                    />
                </div>

                {/* Age Input */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your age"
                    />
                </div>

                {/* Gender Dropdown */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Gender:</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Exercise Frequency Dropdown */}
                <div className="md:col-span-2">
                    <label className="block text-lg font-medium text-gray-700">How often do you exercise?</label>
                    <select
                        value={exerciseFrequency}
                        onChange={(e) => setExerciseFrequency(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="">Select exercise frequency</option>
                        <option value="sedentary">Sedentary (little or no exercise)</option>
                        <option value="light">Light exercise (1-3 times a week)</option>
                        <option value="moderate">Moderate exercise (3-5 times a week)</option>
                        <option value="intense">Intense exercise (6-7 times a week)</option>
                    </select>
                </div>
            </div>

            {/* Button to calculate protein requirement */}
            <div className="flex justify-center md:justify-start mt-6">
                <button
                    onClick={calculateProteinRequirement}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                    Calculate Protein Requirement
                </button>
            </div>

            {/* Show protein requirement result */}
            {proteinRequirement && (
                <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                    Your daily protein requirement is approximately <strong>{proteinRequirement}g</strong>.
                </div>
            )}
        </div>
    );
};

export default CheckProteinRequirement;
