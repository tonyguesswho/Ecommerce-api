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
  email: 'test@gmail.com',
  name: 'tony',
  password: 'password'
};

const customer2 = {
  email: 'test2@gmail.com',
  name: 'tony',
  password: 'password',
};

let token = '';

before((done) => {
  Customer.destroy({ truncate: true });
  chai.request(app)
    .post('/customers')
    .send({
      name: customer2.name,
      email: customer2.email,
      password: customer2.password
    })
    .end((err, res) => {
      token = res.body.accessToken;
      done();
    });
});


describe('POST /customers', () => {
  it('should register a new customer', (done) => {
    chai.request(app)
      .post('/customers')
      .send(customer)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.customer.name).to.equal(customer.name);
        expect(res.body.customer.email).to.equal(customer.email);
        expect(res.body).to.have.property('accessToken');
        expect(res.body.expires_in).to.equal('24h');
        done();
      });
  });

  it('should return 409 if email exists', (done) => {
    chai.request(app)
      .post('/customers')
      .send(customer)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.error.code).to.equal('USR_04');
        expect(res.body.error.field).to.equal('email');
        expect(res.body.error.message).to.equal('The email already exists.');
        done();
      });
  });
});

describe('POST /customers/login', () => {
  it('should successfully login a customer', (done) => {
    chai.request(app)
      .post('/customers/login')
      .send({
        email: customer.email,
        password: customer.password
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.customer.name).to.equal(customer.name);
        expect(res.body.customer.email).to.equal(customer.email);
        expect(res.body).to.have.property('accessToken');
        expect(res.body.expires_in).to.equal('24h');
        done();
      });
  });

  it('should fail if email is wrong', (done) => {
    chai.request(app)
      .post('/customers/login')
      .send({
        email: 'wrong@gmail.com',
        password: customer.password
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.code).to.equal('USR_05');
        expect(res.body.error.field).to.equal('email');
        expect(res.body.error.message).to.equal('The email doesn\'t exist');
        done();
      });
  });

  it('should fail if password is wrong', (done) => {
    chai.request(app)
      .post('/customers/login')
      .send({
        email: customer.email,
        password: 'wrongpassword'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error.code).to.equal('USR_01');
        expect(res.body.error.message).to.equal('Email or Password is invalid.');
        done();
      });
  });
});

describe('GET /customers', () => {
  it('should successfully retrieve a customers info', (done) => {
    chai.request(app)
      .get('/customer')
      .set('USER-KEY', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('PUT /customers', () => {
  it('should successfully update a customers info when all data is provided', (done) => {
    chai.request(app)
      .put('/customers')
      .set('USER-KEY', token)
      .send({
        email: customer2.email,
        name: customer2.name,
        password: 'password',
        day_phone: '8999999999',
        eve_phone: '6789876872333',
        mob_phone: '0976789344434',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(customer2.name);
        expect(res.body.email).to.equal(customer2.email);
        expect(res.body.day_phone).to.be.a('string');
        expect(res.body.eve_phone).to.be.a('string');
        expect(res.body.mob_phone).to.be.a('string');
        done();
      });
  });

  it('should successfully update a customers info when some data are not provided', (done) => {
    chai.request(app)
      .put('/customers')
      .set('USER-KEY', token)
      .send({
        email: customer2.email,
        name: customer2.name
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(customer2.name);
        expect(res.body.email).to.equal(customer2.email);
        done();
      });
  });

  it('should successfully update a customers address info when all data is provided', (done) => {
    chai.request(app)
      .put('/customers/address')
      .set('USER-KEY', token)
      .send({
        address_1: 'Sokoto',
        address_2: 'Benin',
        city: 'Legon',
        region: 'Accra',
        postal_code: '66278',
        country: 'USA',
        shipping_region_id: 3,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.address_1).to.be.a('string');
        expect(res.body.address_2).to.be.a('string');
        expect(res.body.city).to.be.a('string');
        expect(res.body.region).to.be.a('string');
        expect(res.body.postal_code).to.be.a('string');
        expect(res.body.country).to.be.a('string');
        expect(res.body.shipping_region_id).to.be.a('number');
        done();
      });
  });

  it('should successfully update a customers address info when some data are not provided', (done) => {
    chai.request(app)
      .put('/customers/address')
      .set('USER-KEY', token)
      .send({
        address_1: 'No 1',
        city: 'Maryland',
        region: 'Lagos',
        postal_code: '910101',
        country: 'USA',
        shipping_region_id: 3,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.address_1).to.be.a('string');
        expect(res.body.city).to.be.a('string');
        expect(res.body.region).to.be.a('string');
        expect(res.body.postal_code).to.be.a('string');
        expect(res.body.country).to.be.a('string');
        expect(res.body.shipping_region_id).to.be.a('number');
        done();
      });
  });

  it('should successfully update a customers credit card', (done) => {
    chai.request(app)
      .put('/customers/creditCard')
      .set('USER-KEY', token)
      .send({
        credit_card: '444444444444'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.credit_card).to.be.a('string');
        done();
      });
  });
});
