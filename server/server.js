import express from 'express'
import path from 'path'
import dotenv from './config/dotenv.js'
import eventsrouter from './routes/events.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())
app.use('/api', eventsrouter) 
app.get('/', (req, res) => {
    res.send('API lets goo!')
})

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})