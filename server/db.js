const mongoose = require('mongoose');
const uri = "mongodb+srv://Surya:Surya@123@cluster0-rng2v.mongodb.net/fixit?retryWrites=true&w=majority"

class MongooseConnection {
    async connect() {
        return await mongoose
            .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    };
}

module.exports = new MongooseConnection();