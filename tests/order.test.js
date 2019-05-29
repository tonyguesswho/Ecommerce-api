import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';
import db from '../src/models';

const {
  Customer
} = db;


chai.use(chaiHttp);

const customer = {
  email: 'test2@gmail.com',
  name: 'tony',
  password: 'password'
};

let token = '';


before((done) => {
  Customer.destroy({ truncate: true });
  chai.request(app)
    .post('/customers')
    .send({
      name: customer.name,
      email: customer.email,
      password: customer.password
    })
    .end((err, res) => {
      token = res.body.accessToken;
      done();
    });
});


describe('Create Orders', () => {
  it('should return error if required field is empty', (done) => {
    chai.request(app)
      .post('/orders')
      .set('USER-KEY', token)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.message).to.equal('cart_id is required');
        done();
      });
  });

  it('should return error if user is not authenticated', (done) => {
    chai.request(app)
      .post('/orders')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error.message).to.equal('Authorization code is empty');
        done();
      });
  });
});

describe('Get Order details', () => {
  it('should return error if order id is invalid', (done) => {
    chai.request(app)
      .get('/orders/dc')
      .set('USER-KEY', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.message).to.equal('Order id must be a number');
        done();
      });
  });

  it('should return error if order not found', (done) => {
    chai.request(app)
      .get('/orders/7')
      .set('USER-KEY', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error.message).to.equal('Order Not found');
        done();
      });
  });

  it('should return error if token does not contain bearer ', (done) => {
    chai.request(app)
      .post('/orders')
      .set('USER-KEY', 'token')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error.message).to.equal('The userkey is invalid');
        done();
      });
  });

  it('should return error if token is invalid ', (done) => {
    chai.request(app)
      .post('/orders')
      .set('USER-KEY', `${token}a`)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error.message).to.equal('The userkey is invalid');
        done();
      });
  });
});
