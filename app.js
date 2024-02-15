const express = require('express');

const userRouter = require('./routers/userRouter');
const zooRouter = require('./routers/zooRouter');
const cageRouter = require('./routers/cageRouter');
const animalRouter = require('./routers/animalRouter');

const app = express();
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/zoos', zooRouter);
app.use('/api/v1/cages', cageRouter);
app.use('/api/v1/animals', animalRouter);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du Zoo!');
});

module.exports = app;