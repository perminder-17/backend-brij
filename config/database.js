const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect( "mongodb://localhost:27017/brijeshData", {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};