const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/cpdeial_development');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , "Error connecting to mongoDB"));


db.once('open' , function(){
    console.log('connected to database : mongoDB');
});

module.exports = db;