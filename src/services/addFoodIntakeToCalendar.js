import axios from 'axios';

const addFoodIntakeToCalendar = async (authToken, title, items, date) => {
    if (!authToken) {
        throw new Error("Authentication token not found!");
    }

    if (!items || !title) {
        throw new Error("Items not found!");
    }

    const foodItemsDescription = items.items.map(item => `${item.foodItem} (X ${item.quantity})`).join(', ');

    const eventDetails = {
        summary: `${title} : ${items.totalCalories}cal & ${items.totalProtein}g protein`,
        description: `Food taken : ${foodItemsDescription}`,
        start: {
            dateTime: date,
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: date,
            timeZone: 'Asia/Kolkata',
        },
        reminders: {
            useDefault: false, // Disable all default reminders
            overrides: [
                { method: 'popup', minutes: 10 }, // Only allow pop-ups, with a reminder 10 minutes before the event
            ],
        },
    };

    try {
        const response = await axios.post(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            eventDetails,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data; // Return the event data after it is successfully added
    } catch (error) {
        console.error('Error adding event to Google Calendar:', error.response?.data?.error?.message || error.message);
        throw new Error(error.response?.data?.error?.message || 'Failed to add event to Google Calendar');
    }
};

export default addFoodIntakeToCalendar;
