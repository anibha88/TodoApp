const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');


    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //         _id: new ObjectID('5b768cbce59934cb116a8223')
    //     }, {
    //         $set: {
    //             completed: false
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result);
    //     });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b76cf1fe59934cb116a8d24')
    }, {
        $set: {
            name: 'Nikitha Bharadhwaj'
        },
        $inc: { 
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});