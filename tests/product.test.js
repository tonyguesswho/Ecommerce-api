/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';
import db from '../src/models';

const { Product } = db;
const newProduct = {
  product_id: 1,
  name: 'fish',
  description: 'test description',
  price: '444',
  discounted_price: '40',
  image: 'test.gif',
  image2: 'test2.gif',
  thumbnail: 'somali-fish-thumbnail.gif',
  display: 2
};


chai.use(chaiHttp);
const beforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Product.create(newProduct);
  });
};

describe('Testing products endpoints', () => {
  beforeEach();
  describe('get all products', () => {
    it('should fetch all products', (done) => {
      chai.request(app)
        .get('/products')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.count).to.be.equal(1);
          expect(res.body.rows).to.be.an('array');
          done();
        });
    });
  });
  describe('get a single product', () => {
    it('should fetch a single product', (done) => {
      chai.request(app)
        .get('/products/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not fetch single product if product_id is invalid', (done) => {
      chai.request(app)
        .get('/products/9')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('search products', () => {
    it('should return error if search term is not provided', (done) => {
      chai.request(app)
        .get('/products/search')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.an('object');
          expect(res.body.error.message).to.equal('Query string is required');
          done();
        });
    });
  });

  describe('gets products in category', () => {
    it('should return error if category id is not provided', (done) => {
      chai.request(app)
        .get('/products/inCategory')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.an('object');
          expect(res.body.error.message).to.equal('Category Id is required');
          done();
        });
    });
  });

  describe('gets products in department', () => {
    it('should return error if department id is not provided', (done) => {
      chai.request(app)
        .get('/products/inDepartment')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.an('object');
          expect(res.body.error.message).to.equal('Category Id is required');
          done();
        });
    });
  });
});
