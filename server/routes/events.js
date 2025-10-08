import express from 'express'
import { eventData, locationData } from '../data/events.js';
import EventsController from '../controllers/events.js'
// import controllers for events and locations


const router = express.Router()

// define routes to get events and locations
router.get('/', (req, res) => {
    res.send('/api works lets goo!')
})
router.get('/events', EventsController.getAllEvents)
router.get('/locations',EventsController.getAllLocations)
router.get('/events/:eventId', EventsController.getEventById)
router.get('/locations/:id',EventsController.getLocationById)

router.get('/locations/:id/events',EventsController.getEventsByLocationId)
export default router