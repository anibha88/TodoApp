const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Users').deleteMany({name: 'Nithin'}).then((result) => {
    //     console.log(result);
    // });
    //deleteOne
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b76d06de59934cb116a8d71')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    //db.close();
});