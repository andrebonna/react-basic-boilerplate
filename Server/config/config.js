export default {
    protocol: process.env.PROTOCOL || 'http',
    address: process.env.ADDRESS || 'localhost',
    port: process.env.PORT || 3000,
    mongoDB: process.env.MONGO_DB || 'localhost',
    mongoDBPort: process.env.MONGO_DB_PORT || '27017'
}
