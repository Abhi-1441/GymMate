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

    const daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await fetchGoogleCalendarEvents(authToken, selectedMonth, selectedYear);
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

    const generateCalendar = () => {
        const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
        const daysInCurrentMonth = daysInMonth(selectedMonth, selectedYear);

        const calendarCells = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarCells.push(<div key={`empty-${i}`} className="border p-2 h-16 md:h-20" />);
        }

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const currentDayEvents = events.filter((event) => {
                const eventDate = new Date(event.start.date || event.start.dateTime).getDate();
                return eventDate === day;
            });

            calendarCells.push(
                <div key={day} className="border p-2 h-20 relative overflow-auto">
                    <div className="font-bold text-xs">{day}</div>
                    {currentDayEvents.map((event, index) => (
                        <div key={index} className="relative group mt-1">
                            <div className="w-full h-2 bg-blue-500 rounded transition-all duration-300 ease-in-out group-hover:h-auto group-hover:bg-blue-700 cursor-pointer">
                                <div className="hidden group-hover:block p-1 text-white text-xs">
                                    <div className="flex flex-col md:flex-row justify-between items-start">
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
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="hover:border hover:border-red-500 ml-2"
                                            title="Delete Event"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
        <div className="sm:p-4">
            {!events ? <div>Fetching events...</div> :
                events.length ?
                    <div className="text-lg">Total <b>{events.length} </b> event{events.length > 1 ? 's' : ''} found in selected month.</div> :
                    <div>No events found in selected month</div>
            }
            <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <select value={selectedMonth} onChange={handleMonthChange} className="border p-2 rounded mb-2 md:mb-0">
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

            <div className="grid grid-cols-7 gap-2 text-xs md:text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-bold text-center border-b pb-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-xs md:text-sm">
                {generateCalendar()}
            </div>
        </div>
    );
};

export default CalendarDisplay;
