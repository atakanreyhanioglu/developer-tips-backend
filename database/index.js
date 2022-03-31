const connectMongo = require('./mongo.db')

const dbConnection = {
    mongoDB: connectMongo.connection()
}
module.exports = dbConnection
