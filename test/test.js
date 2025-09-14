const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const expect = chai.expect; //set to expect since we expect to see specific results

chai.use(chaiHttp); 

describe('User Model', () => {
    it('should create a user successfully', (done) => {
        chai.request(app)
            .post('/users')
            .send({ name: 'testuser', email: 'test@email.com' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('name', 'testuser');
                expect(res.body).to.have.property('email', 'test@email.com');
                done();
            });
    });

    it('should not create a user with missing fields', (done) => {
        chai.request(app)
            .post('/users')
            .send({ name: '' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});

describe('Posts Model', () => {

    //create test user before doing post tests
    before((done) => {
        chai.request(app)
            .post('/users')
            .send({ name: 'testuser', email: 'test@email.com' })
            .end((err, res) => {
                done();
            });
    });

    it('should create a post successfully', (done) => {
        chai.request(app)
            .post('/posts')
            .send({ 
                postTitle: 'Test Post', 
                body: 'This is a test post.', 
                name: 'testuser', 
                category: 'TestCategory' 
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('postTitle', 'Test Post');
                done();
            });          
    });
});