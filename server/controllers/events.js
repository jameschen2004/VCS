import { pool } from '../config/database.js'
//get event id
const getEventById = async(req, res) =>{
    try{
    const selectQuery = `
    SELECT *
    FROM events
    WHERE id=$1
    `
    const eventId = req.params.eventId
    const results = await pool.query(selectQuery, [eventId])
    res.status(200).json(results.rows[0])
    }catch(error){
        res.status(409).json( { error: error.message} )
    }
}
//get location id
const getLocationById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT * 
        FROM locations 
        WHERE id=$1
        `
        
        const locationId = req.params.id;

        const results = await pool.query(selectQuery, [locationId]);
        res.status(200).json(results.rows[0])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'location not found' });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

//get location from event id
const getEventsByLocationId = async (req, res) => {
    try {
        const selectQuery = `
            SELECT * FROM events 
            WHERE location = $1;
        `;
        const locationId = req.params.id;
        const results = await pool.query(selectQuery, [locationId]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};
//all locations id
const getAllLocations = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
    }catch(error){
        res.status(409).json( { error: error.message } )
    }
}
//all events id
const getAllEvents = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    }catch(error){
        res.status(409).json( { error: error.message } )
    }
}
export default{
    getEventById,
    getLocationById,
    getEventsByLocationId,
    getAllEvents,
    getAllLocations
}