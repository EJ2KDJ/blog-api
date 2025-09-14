const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect; //set to expect since we expect to see specific results

chai.use(chaiHttp); 

describe('User Model', () => {
    it('should create a user successfully', (done) => {
        chai.request(app)
            .post('/users')
            .send({ username: 'testuser', password: 'testpass' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('username', 'testuser');
                done();
            });
    });

    it('should not create a user with missing fields', (done) => {
        chai.request(app)
            .post('/users')
            .send({ username: '' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});

describe('Posts Model', () => {
    it('should create a post successfully', (done) => {
        chai.request(app)
            .post('/posts')
            .send({ postTitle: 'Test Post', body: 'This is a test post.', name: 'testuser', category: 'TestCategory' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('postTitle', 'Test Post');
                done();
            });          
    });
});