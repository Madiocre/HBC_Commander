const express = require('express')
const app = express()
const cors = require('cors');
const { Sequelize } = require('sequelize');

app.use(cors())

const sequelize = new Sequelize(
    'hpc_test',
    'root',
    '',
     {
       host: '127.0.0.1',
       dialect: 'mysql'
     }
   );

app.get('/', (_, res) => {
    // Choose only one of the following
    res.status(404).send('Not Found'); // Sends a 404 status with a body
    // or
    // res.sendStatus(404); // Sends a 404 status without a body
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
  });