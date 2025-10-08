import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    useEffect(() => {

        const fetchLocationData = async () => {
            try {
                const locationResponse = await fetch(`http://localhost:3001/api/locations/${index}`);
                const locationData = await locationResponse.json();
                setLocation(locationData);

                const eventsResponse = await fetch(`http://localhost:3001/api/locations/${index}/events`);
                const eventsData = await eventsResponse.json();
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        if (index) {
        
            fetchLocationData();
        }

    }, [index])

    if (!location) {
        return <div>Loading...</div>;
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}

                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents

