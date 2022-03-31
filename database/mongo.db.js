const mongoose = require("mongoose");
const mongoDB = {
    connection: function () {
       mongoose.connect(process.env.MONGODB_URI)
           .then(()=>console.log('Mongo DB connection successful.')).catch(err => console.log(err))
    }
}

module.exports = mongoDB
