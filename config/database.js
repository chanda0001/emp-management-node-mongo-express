const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Database connected successfully")) 
    .catch( (err) => {
        console.log("Database connection failed");
        console.log(err);
        process.exit(1); //return 0 type
    })
};
module.exports = connectWithDb;