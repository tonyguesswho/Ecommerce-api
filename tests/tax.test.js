import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';
import db from '../src/models';

const insertTaxQuery = `INSERT INTO tax (tax_id, tax_type, tax_percentage) VALUES
       (1, 'Sales Tax at 8.5%', 8.50),
       (2, 'No Tax',            0.00);`;


chai.use(chaiHttp);

const beforeEach = () => {
  before(async () => {
    await db.sequelize.sync({
      force: true
    });
    await db.sequelize.query(insertTaxQuery);
  });
};


describe('Get all takes', () => {
  beforeEach();
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
  beforeEach();
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
});
