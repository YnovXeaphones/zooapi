const express = require('express');

/*const userRouter = require('./routes/userRoutes');
const zooRouter = require('./routes/zooRoutes');
const cageRouter = require('./routes/cageRoutes');
const animalRouter = require('./routes/animalRoutes');*/

const app = express();
app.use(express.json());

/*app.use('/api/users', userRouter);
app.use('/api/zoos', zooRouter);
app.use('/api/cages', cageRouter);
app.use('/api/animals', animalRouter);*/

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du Zoo!');
});

module.exports = app;