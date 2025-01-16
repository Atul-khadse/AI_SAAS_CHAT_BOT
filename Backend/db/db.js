const mongoose = require('mongoose');

require('dotenv').config();

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        })
        .then(console.log("DB connect successfully"))
        .catch((err) => {
            console.log("DB connection issue");

        });
};





module.exports = connectToDb;