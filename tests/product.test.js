/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint max-len: ["error", { "code": 500 }] */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';

chai.use(chaiHttp);


describe('Testing products endpoints', () => {
  describe('get all products', () => {
    it('should fetch all products', (done) => {
      chai.request(app)
        .get('/products?description_length=20')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
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
    it('should not return 404 if product id dosent exist', (done) => {
      chai.request(app)
        .get('/products/9000')
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
    it('should return search item', (done) => {
      chai.request(app)
        .get('/products/search?all_words=off&description_length=20&limit=20&query_string=St.&page=1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return search item with allwords on', (done) => {
      chai.request(app)
        .get('/products/search?all_words=on&description_length=20&limit=20&query_string=St.&page=1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
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

    it('should return product in category', (done) => {
      chai.request(app)
        .get('/products/inCategory/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
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

    it('should return product in department', (done) => {
      chai.request(app)
        .get('/products/inDepartment/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
