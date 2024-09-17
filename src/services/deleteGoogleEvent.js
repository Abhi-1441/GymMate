import axios from 'axios';

const deleteGoogleEvent = async (authToken, eventId) => {
    if (!authToken) {
        throw new Error("Authentication token not found!");
    }

    if (!eventId) {
        throw new Error("Event not found!");
    }

    const calendarId = 'primary'; // Use the primary calendar
    try {
        await axios.delete(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        console.log('Event deleted successfully');
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

export default deleteGoogleEvent;
