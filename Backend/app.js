const express = require("express");
const app = express();
const connectToDb = require('./db/db');
const userRouters = require('./routers/user.routes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');



connectToDb();


app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get('/',(req , res) => {
    res.send("hello jee")
});

app.use('/users', userRouters);



module.exports = app;