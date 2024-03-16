const { instance } = require('./model/indexModel');

instance.sync().then(() => {
    console.log('Database & tables created!');

    const app = require('./app');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`API documentation on http://localhost:${PORT}/api/documentation`);
    });
}).catch(error => {
    console.error('Failed to sync database:', error);
});