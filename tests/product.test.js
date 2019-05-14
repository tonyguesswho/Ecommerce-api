/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';
import db from '../src/models';

const {
  Product, Department, Category, ProductCategory
} = db;
const newProduct = {
  name: 'test product',
  description: 'test description',
  price: '444',
  discounted_price: '40',
  image: 'test.gif',
  image2: 'test2.gif',
  thumbnail: 'somali-fish-thumbnail.gif',
  display: 2
};

const newDepartment = {
  department_id: 1,
  name: 'Regional',
  description: 'Proud of your country? Wear a T-s'
};

const newCategory = {
  category_id: 1,
  name: 'French',
  description: 'The French',
  department_id: 1
};
const newProductCategory = {
  product_id: 1,
  category_id: 1
};


chai.use(chaiHttp);
const doBeforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await Promise.all([
      Product.create(newProduct),
      Department.create(newDepartment),
      Category.create(newCategory),
      ProductCategory.create(newProductCategory)
    ]);
  });
};

describe('Testing products endpoints', () => {
  doBeforeEach();
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
});
