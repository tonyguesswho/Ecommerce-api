import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';


chai.use(chaiHttp);


describe('Get all shipping regions', () => {
  it('should return all regions', (done) => {
    chai.request(app)
      .get('/shipping/regions')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Get a particular tax', () => {
  it('should return an error if regiond id is invalid', (done) => {
    chai.request(app)
      .get('/shipping/regions/dc')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.message).to.equal('shipping region id must be a number');
        done();
      });
  });
});
