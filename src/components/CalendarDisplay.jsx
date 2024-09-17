import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import fetchGoogleCalendarEvents from '../services/fetchGoogleCalendarEvents';
import deleteGoogleEvent from '../services/deleteGoogleEvent';
import { toast } from 'react-toastify';

const CalendarDisplay = () => {

    const authToken = useSelector(state => state.auth.token) || null;

    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    // Helper function to get the number of days in a given month
    const daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await fetchGoogleCalendarEvents(authToken, selectedMonth, selectedYear);
            toast.success("Synced with calendar")
            setEvents(fetchedEvents);
        } catch (error) {
            toast.error(`${error}`);
            console.error('Error fetching events:', error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, [selectedMonth, selectedYear]);

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteGoogleEvent(authToken, eventId);
            toast.success("Google event deleted Successfully ");

            fetchEvents(); // Reload events
        } catch (error) {
            toast.error(`${error}`);
            console.error('Error deleting event:', error);
        }
    };

    // Generate the month layout (with days of the week and date cells)
    const generateCalendar = () => {
        const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
        const daysInCurrentMonth = daysInMonth(selectedMonth, selectedYear);

        const calendarCells = [];
        // Add empty cells for the days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarCells.push(<div key={`empty-${i}`} className="border p-2 h-16 " />);
        }

        // Fill the calendar with days
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const currentDayEvents = events.filter((event) => {
                const eventDate = new Date(event.start.date || event.start.dateTime).getDate();
                return eventDate === day;
            });

            calendarCells.push(
                <div key={day} className="border p-2 h-20 relative overflow-auto">
                    <div className="font-bold text-xs">{day}</div>
                    {currentDayEvents.map((event, index) => (
                        <div
                            key={index}
                            className="relative group mt-1"
                        >
                            {/* Small bar initially */}
                            <div className="w-full h-2 bg-blue-500 rounded transition-all duration-300 ease-in-out group-hover:h-auto group-hover:bg-blue-700 cursor-pointer">
                                {/* Hidden content inside the bar */}
                                <div className="hidden group-hover:block p-1 text-white text-xs">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-bold">{event.summary}</div>
                                            <div>
                                                {new Date(event.start.date || event.start.dateTime).toLocaleTimeString('en-IN', {
                                                    timeZone: 'Asia/Kolkata',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                        {/* Delete (cross) button */}
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="hover:border hover:border-red-500 ml-2 "
                                            title="Delete Event"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            );



        }

        return calendarCells;
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    return (
        <div className="p-4">
            {events.length ?
                <div className="text-lg">Total <b>{events.length} </b> found in selected month.</div> :
                <div>No events found in selected month</div>
            }
            <div className="flex justify-between mb-4">
                <select value={selectedMonth} onChange={handleMonthChange} className="border p-2 rounded">
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="border p-2 rounded"
                    min="1900"
                />
            </div>

            <div className="grid grid-cols-7 gap-2">
                {/* Weekday Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-bold text-center border-b pb-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {/* Calendar days and events */}
                {generateCalendar()}
            </div>
        </div>
    );
};

export default CalendarDisplay;
