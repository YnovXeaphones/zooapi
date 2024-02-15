const app = require('./app');

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("API documentation on http://localhost:3000/api/v1/documentation");
});