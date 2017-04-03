var express = require('express');
var todoControllers = require('./controllers/todoControllers');

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