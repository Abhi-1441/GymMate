import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import addFoodIntakeToCalendar from '../services/addFoodIntakeToCalendar';
import { toast } from 'react-toastify';

const AddToCalendarButton = () => {
    const authToken = useSelector(state => state.auth.token);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString());
    const items = useSelector(state => state.items);

    const handleAddToCalendar = async () => {
        try {
            const eventTitle = title.trim() || "Food Intake"; // Use default title if input is empty
            const selectedDate = date || new Date().toISOString(); // Use selected date or current date

            await addFoodIntakeToCalendar(authToken, eventTitle, items, selectedDate);
            toast.success('Food intake added to Google Calendar!');
            setTitle('');
            setDate(''); // Reset title and date fields after adding event
        } catch (error) {
            setTitle('');
            setDate('');
            toast.error(`${error}`);
            console.error('Error adding to Google Calendar:', error);
        }
    };

    return (
        <div className="my-8 space-x-3">
            {/* Input for Event Title */}
            <div className="text-xl font-bold mb-2">Google Calender details</div>
            <div className="mb-4 ">
                <label className="block text-lg font-medium text-gray-700">Event Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Food Intake "
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Input for Date Selection */}
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Select Date:</label>
                <input
                    type="date"
                    value={date.split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Button to Add Event */}
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
                onClick={handleAddToCalendar}
            >
                Add Food Intake to Calendar
            </button>
        </div>
    );
}

export default AddToCalendarButton;
