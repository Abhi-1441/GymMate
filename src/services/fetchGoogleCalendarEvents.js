import axios from 'axios';

const fetchGoogleCalendarEvents = async (authToken, selectedMonth, selectedYear) => {
    if (!authToken) {
        throw new Error("Authentication token not found!");
    }

    if (!selectedMonth || !selectedYear) {
        throw new Error("Select valid month and year");
    }

    const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1).toISOString();
    const endOfMonth = new Date(selectedYear, selectedMonth, 0).toISOString();

    try {
        const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                timeMin: startOfMonth,
                timeMax: endOfMonth,
            },
        });

        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching events:', error.response?.data?.error?.message || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch calendar events');
    }
};

export default fetchGoogleCalendarEvents;
