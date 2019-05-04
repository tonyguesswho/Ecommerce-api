import { Router } from 'express';
import passport from 'passport';
import customerController from '../controllers/customerController'
import SocialAuthController from '../controllers/socialAuthController';
import authenticate from '../../middlewares/authenticate';


const customerRouter = Router();

customerRouter.post('/', customerController.register);

customerRouter.post('/login', customerController.login);

customerRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
customerRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }), SocialAuthController.authResponse
);

export default customerRouter

