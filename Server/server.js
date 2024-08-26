// server.js
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const userController = require('./controllers/userController');
const jobController = require('./controllers/jobController');

const app = express();
app.use(express.json()); // For parsing application/json
app.use(cors());

const sequelize = new Sequelize('hpc_test', 'root', '1234', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



// Define routes
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.post('/jobs', jobController.createJob);
app.get('/jobs', jobController.getAllJobs);
app.get('/jobs/:id', jobController.getJobById);
app.put('/jobs/:id', jobController.updateJob);
app.delete('/jobs/:id', jobController.deleteJob);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
