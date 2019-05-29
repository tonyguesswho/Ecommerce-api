import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../src/index';

chai.use(chaiHttp);
describe('Socail Auth', () => {
  it('should return error if access token is not provided', (done) => {
    chai.request(app)
      .post('/customers/facebook')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.message).to.equal('Access Token is required');
        done();
      });
  });

  it('should return error if access token is ninvalid', (done) => {
    chai.request(app)
      .post('/customers/facebook')
      .send({ access_token: 'hjjjjj' })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.error.message).to.equal('Access Forbidden');
        done();
      });
  });
});
