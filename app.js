const express = require('express');
const path = require('path');
const openApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load OpenAPI specification
const apiSpec = path.join(__dirname, 'Zooapi.yml');
const openApiDocumentation = YAML.load(apiSpec);

// Router Loading
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const zooRouter = require('./routers/zooRouter');
const cageRouter = require('./routers/cageRouter');
const animalRouter = require('./routers/animalRouter');

// App Configuration
const app = express();
app.use(express.json());

app.use(
    openApiValidator.middleware({
        apiSpec: path.join(__dirname, 'Zooapi.yml'),
    }),
);

// Routes configuration

// v1
const v1prefix = "/api/v1"

app.use(`${v1prefix}/documentation`, swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use(`${v1prefix}/login`, authRouter);
app.use(`${v1prefix}/users`, userRouter);
app.use(`${v1prefix}`, zooRouter);
app.use(`${v1prefix}/cages`, cageRouter);
app.use(`${v1prefix}/animals`, animalRouter);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du Zoo!');
});

module.exports = app;