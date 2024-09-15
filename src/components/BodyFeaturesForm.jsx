import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBodyFeatures } from '../redux/slices/bodyFeaturesSlice';

const BodyFeaturesForm = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(true); // State to toggle between edit and view mode

    const dispatch = useDispatch();
    const existingBodyFeatures = useSelector((state) => state.bodyFeatures);

    useEffect(() => {
        if (existingBodyFeatures.requiredProtein > 0) setIsEditing(false);
    }, [existingBodyFeatures])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (height && weight) {
            if (height < 0 || weight < 0) return setError("Both height and weight should be positive values.")
            const heightNum = parseFloat(height);
            const weightNum = parseFloat(weight);

            dispatch(addBodyFeatures({ height: heightNum, weight: weightNum }));

            setHeight('');
            setWeight('');
            setError('');
            setIsEditing(false); // Switch to view mode after submission
        } else {
            setError('Both height and weight are required.');
        }
    };

    const handleUpdate = () => {
        setIsEditing(true); // Switch to edit mode
    };

    return (
        <div className="max-w-md mb-12">
            {isEditing ? (
                <div>
                    <h2 className="text-xl font-bold mb-4">Enter Your Body Features</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Height (cm):</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter height in cm"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Weight (kg):</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter weight in kg"
                            />
                        </div>
                        {error && <p className="text-red-500 font-bold">{error}</p>}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div className='mt-8 bg-blue-100 p-4 rounded-lg shadow-sm'>
                    <div className="flex justify-between align-middle mb-2">
                        <h2 className="text-xl font-bold ">Your Body Features</h2>
                        <button
                            onClick={handleUpdate}
                            className="text-yellow-500 hover:underline font-bold "
                        >
                            Update Features
                        </button>
                    </div>
                    <p className="text-lg ">Height: {existingBodyFeatures.height} cm</p>
                    <p className="text-lg ">Weight: {existingBodyFeatures.weight} kg</p>
                    <p className="text-lg ">Required Protein: <b>{existingBodyFeatures.requiredProtein.toFixed(2)} grams</b> per day</p>
                </div>
            )}
        </div>
    );
};

export default BodyFeaturesForm;
