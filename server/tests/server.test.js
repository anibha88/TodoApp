const expect = require('expect');
const request = require('supertest');

//load in server.js so that we have access to the express app
const {app} = require('./../server');


// Also load in todo model
const {Todo} = require('./../models/todo');

//Add a testing life cycle method
beforeEach((done) => {
    Todo.remove({}).then(() => done());
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
                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((err) => done(err)); 
            });
    });

});