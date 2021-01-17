// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(projectData)
})

// // Callback function to complete GET '/all'
// function getData(req, res) {
//     res.send(projectData)
// }

// Post Route
app.post('/addWeatherData', addData)
function addData(req, res) {
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response
    }
    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData,"project Data")
}
// Setup Server
const port = 8000;

//spin up the server
app.listen(port, () => {
    console.log(`server is running on http://localhost ${port}`)
})
// Callback to debug
// function listening() {
//     console.log("server is running");
//     console.log(`running on localhost on port ${port}`)
// }
