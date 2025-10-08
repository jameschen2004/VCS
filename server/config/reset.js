import { pool } from './database.js'
import { eventData, locationData } from '../data/events.js'


const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;
        CREATE TABLE IF NOT EXISTS locations (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(2),
            zip VARCHAR(10),
            image VARCHAR(255)
        );
    `
    try {
        await pool.query(createTableQuery);
        console.log('✅ locations table created successfully');
    } catch (err) {
        console.error('❌ Error creating locations table:', err);
        throw err;
    }
}

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time VARCHAR(10) NOT NULL,
            location INT REFERENCES locations(id) ON DELETE SET NULL,
            image VARCHAR(255) NOT NULL,
            remaining JSONB
        );
    `
    try {
        await pool.query(createTableQuery);
        console.log('✅ events table created successfully');
    } catch (err) {
        console.error('❌ Error creating events table:', err);
        throw err;
    }
}

const seedTables = async () => {
    const client = await pool.connect();
    try {
        console.log('🌱 Starting database transaction...');
        await client.query('BEGIN');


        for (const location of locationData) {
            const insertQuery = {
                text: 'INSERT INTO locations (id, name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                values: [location.id, location.name, location.address, location.city, location.state, location.zip, location.image],
            }
            await client.query(insertQuery);
            console.log(`✅ queued location: ${location.name}`);
        }

        for (const event of eventData) {
            const insertQuery = {
                text: 'INSERT INTO events (title, date, time, location, image, remaining) VALUES ($1, $2, $3, $4, $5, $6)',
                values: [event.title, event.date, event.time, event.location, event.image, event.remaining],
            }
            await client.query(insertQuery);
            console.log(`✅ queued event: ${event.title}`);
        }

        await client.query('COMMIT');
        console.log('✔️ Transaction committed successfully.');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Transaction failed. Rolling back all changes.');
        throw err;
    } finally {
        client.release();
        console.log(' Client released.');
    }
};


const runReset = async () => {
    try {

        await createLocationsTable();
        await createEventsTable();
        await seedTables();
        console.log(' Database reset and seeding complete!');
    } catch (error) {
        console.error('❌ Fatal error during database reset. Halting script.');
    } finally {
        await pool.end(); 
    }
}

runReset();

