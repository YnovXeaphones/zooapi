const express = require('express');
const path = require('path');
const openApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load OpenAPI specification
const apiSpec = path.join(__dirname, 'Zooapi.yml');
const openApiDocumentation = YAML.load(apiSpec);

// Router Loading
const userRouter = require('./routers/userRouter');
const zooRouter = require('./routers/zooRouter');
const cageRouter = require('./routers/cageRouter');
const animalRouter = require('./routers/animalRouter');

const app = express();
app.use(express.json());

app.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use(
  openApiValidator.middleware({
    apiSpec: path.join(__dirname, 'Zooapi.yml'),
  }),
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/zoos', zooRouter);
app.use('/api/v1/cages', cageRouter);
app.use('/api/v1/animals', animalRouter);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du Zoo!');
});

module.exports = app;