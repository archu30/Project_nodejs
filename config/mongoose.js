const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cpdeial_development');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , "Error connecting to mongoDB"));


db.once('open' , function(){
    console.log('connected to database : mongoDB');
});

module.exports = db;