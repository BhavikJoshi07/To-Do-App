var express = require('express');
var todoControllers = require('./controllers/todoControllers');
var mongoose = require('mongoose');

//connect to Database
mongoose.connect('mongodb://test_user:testUser1@ds149820.mlab.com:49820/heroku_rqp2p7kf' || 'mongodb://localhost:27017/todo', (err, db) => {
    if(err) {
        return console.log("Unable to connect to MongoDB Server.");
    }
    console.log("Connected to MongoDB Server.");
});

//Database Schema
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);

var itemOne = Todo({item : 'Buy Flowers'}).save((err) => {
    if(err) {
        return console.log("There was some problem with the Server.");
    }
    console.log("Successfull");
});

const port = process.env.PORT || 3000;
var app = express();

//Set Up Template Engine
app.set('view engine', 'ejs');

//Static Files
app.use(express.static('./public'));

//Define todoControllers
todoControllers(app);

//Listen
app.listen(port, () => {
    console.log(`Server Up! Listening on port ${port}`);
});