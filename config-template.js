module.exports = {
    jwtConfig: {
        secret: "YOUR_SECRET_KEY_HERE"
    },
    dbConfig: {
        dialect: 'YOUR_DB_DIALECT_HERE',
        storage: 'YOUR_DB_STORAGE_PATH_HERE'
    },
    externalConfig: {
        animalsDetails: {
            url: "https://api.api-ninjas.com/v1/animals?name=",
            key: "YOUR_API_KEY"
        }
    }
}