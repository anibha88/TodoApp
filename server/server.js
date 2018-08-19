var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completed_at: {
        type: Number,
        default: null
    }
});

// create an instance
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

var otherTodo = new Todo({
    text: 'Nodejs course'
});
//save it to db
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save the todo', err);
});


var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var user = new User({
    email: '  svani4193@gmail.com     '
});

user.save().then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
}, (err) => {
    console.log('Unable to save User', err);
});

