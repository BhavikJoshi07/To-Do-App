var bodyParser = require('body-parser');
//var data = [{item: 'Complete 1'}, {item: 'Complete 2'}, {item: 'Complete 3'}];
var urlencoded = bodyParser.urlencoded({extended: false});

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

module.exports = (app) => {
    
    app.get('/todo', (req,res) => {
        Todo.find({},(err, data) => {
            if(err) {
                return console.log("Got Some Error");
            }
            res.render('todo', {todos : data});
        });
    });

    app.post('/todo', urlencoded , (req,res) => {
        var newTodo = Todo(req.body).save((err, data) => {
            if(err) {
                return console.log("Got Some Error");
            }
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req,res) => {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data) => {
            if(err) {
                return console.log("Got Some Error");
            }
            res.json(data);
        });
    });

}