require('dotenv').config()

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const featuredContentRoute = require('./controllers/featuredContentControlller')
const usersRoute = require('./controllers/usersController');
const userNotesRoute = require('./controllers/userNotesController');
const errorHandler = require('./middleware/errorhandler'); // Import errorHandler

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
    credentials: true, // allow cookies to be sent
}));

app.use(bodyParser.json());

app.use(cookieParser());



// routes
app.use('/featured-content', featuredContentRoute);
app.use('/users', usersRoute);
app.use('/notes', userNotesRoute);

// error-handling middleware (after all routes)
app.use(errorHandler)

const port = 3001;

// start the server
app.listen(port, () => {
    console.log(`Backend Server is running on http://localhost:${port}`);
});