import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';

chai.use(chaiHttp);
describe('Get all takes', () => {
  it('should return all taxes', (done) => {
    chai.request(app)
      .get('/tax')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);
        done();
      });
  });
});

describe('Get a particular tax', () => {
  it('should return an error if tax id is invalid', (done) => {
    chai.request(app)
      .get('/tax/dc')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.message).to.equal('tax id must be a number');
        done();
      });
  });

  it('should return tax detail based on tax id', (done) => {
    chai.request(app)
      .get('/tax/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.tax_id).to.equal(1);
        done();
      });
  });

  it('should return error if tax id is not found', (done) => {
    chai.request(app)
      .get('/tax/3')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error.message).to.equal('Tax Not found');
        done();
      });
  });
});
