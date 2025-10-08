const getAllEvents = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/events');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all events:", error);
        return [];
    }
};


const getEventsById = async (eventId) => {
    try {
        const response = await fetch(`http://localhost:3001/api/events/${eventId}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Event with ID ${eventId} not found.`);
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error);
        return null;
    }
};
export default{
    getAllEvents,
    getEventsById
}