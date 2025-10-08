const getAllLocations = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/locations');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all locations:", error);
        return [];
    }
};


const getLocationById = async (locationId) => {
    try {
        const response = await fetch(`http://localhost:3001/api/locations/${locationId}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Location with ID ${locationId} not found.`);
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching location with ID ${locationId}:`, error);
        return null;
    }
};
export default {
    getLocationById,
    getAllLocations
}
