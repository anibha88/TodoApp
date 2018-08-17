var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completed_at: {
        type: Number
    }
});

// create an instance
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

var newTodo1 = new Todo({
    text: 'Krishnarpana',
    completed: false,
    completed_at: 1512064288429
});
//save it to db
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

newTodo1.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save the todo', err);
});

