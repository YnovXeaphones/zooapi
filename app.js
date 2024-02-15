const express = require('express');

const userRouter = require('./routers/userRouter');
const zooRouter = require('./routers/zooRouter');
const cageRouter = require('./routers/cageRouter');
const animalRouter = require('./routers/animalRouter');

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/zoos', zooRouter);
app.use('/api/cages', cageRouter);
app.use('/api/animals', animalRouter);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du Zoo!');
});

module.exports = app;