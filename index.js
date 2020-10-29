const express = require('express');

const mongoose = require('mongoose');

const app =express();

const dotenv =require('dotenv');
const authRoute = require('./routes/auth');


dotenv.config();

app.use(express.json());

//middlewares
app.use('/user',authRoute);

///mongodb

mongoose.connect('mongodb://localhost:27017/auth',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

app.listen('3000',()=>{
    console.log("server on");
});

