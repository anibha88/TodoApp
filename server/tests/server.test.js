const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

//load in server.js so that we have access to the express app
const {app} = require('./../server');


// Also load in todo model
const {Todo} = require('./../models/todo');

// Load in some seed data to test GET /todos
const todos = [{
_id: new ObjectID(),
text: 'First test todo'
}, {
_id: new ObjectID(),
text: 'Second test todo'
}];

//Add a testing life cycle method
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {

    //success step
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=> {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                //verify whether the todo is the one that is indeed added.
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });

   

    //failure step
    it('shouldnot create todo with invalid body data', (done) => {
        
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err)); 
            });
    });
});

// GET /todos
describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
          //console.log('result 1',res.body.text);
          //console.log('result 2', todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
         .get(`/todos/${hexId}`)
         .expect(404)
         .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/1234')
            .expect(404)
            .end(done);
    });
});