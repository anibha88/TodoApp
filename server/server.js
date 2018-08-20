//library imports
var express = require('express');
var bodyParser = require('body-parser');

// local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// create a route
app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text
    });
    todo.save().then((doc)=> {
        response.send(doc)
    }, (err) => {
        response.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('started on port 3000');
});