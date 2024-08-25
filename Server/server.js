const express = require('express')
const app = express()
const cors = require('cors');
const { Sequelize } = require('sequelize');


app.use(cors())

app.get('/', (req, res) => {
    // Choose only one of the following
    res.status(404).send('Not Found'); // Sends a 404 status with a body
    // or
    // res.sendStatus(404); // Sends a 404 status without a body
});

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
  });