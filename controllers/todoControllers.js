var bodyParser = require('body-parser');
var data = [{item: 'Complete 1'}, {item: 'Complete 2'}, {item: 'Complete 3'}];
var urlencoded = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    
    app.get('/todo', (req,res) => {
        res.render('todo', {todos : data});
    });

    app.post('/todo', urlencoded , (req,res) => {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', (req,res) => {
        data = data.filter((todo) => todo.item.replace(/ /g, '-') !== req.params.item);
        res.json(data);
    });

}