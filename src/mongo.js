
const mongoose = require('mongoose');
const C = require("./constant");
 
class MongoDB {
 
    constructor() {
        this.bootstrap();
    }
 
    bootstrap() {

        const mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
 
        const mongoURI = C.MONGO_PATH;
 
        mongoose.connect(mongoURI, mongooseOptions);
        mongoose.connection.on("open", (ref) => {
            console.log("Connected to MongoDB server");
        });

        mongoose.connection.on("disconnected", (err) => {
            console.log("MongoDB disconnected!"); 
            process.exit(1);
        });
    }
 
}

module.exports = MongoDB;
