var express = require('express');
var todoControllers = require('./controllers/todoControllers');

var app = express();

//Set Up Template Engine
app.set('view engine', 'ejs');

//Static Files
app.use(express.static('./public'));

//Define todoControllers
todoControllers(app);

//Listen
app.listen(3000, () => {
    console.log("Server Up! Listening on port 3000.");
});