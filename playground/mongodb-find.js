const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // Access the collection
    // db.collection('Todos').find({
    //     _id: new ObjectID('5b75b722f4091105c7bc99b1')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: "Nithin"}).count().then((docs) => {
        console.log('Users matching Nithin');
        console.log(`There are ${docs} number of users matching Nithin`);

    }, (err) => {
        console.log('Unable to fetch users', err);
    });
    //db.close();
});