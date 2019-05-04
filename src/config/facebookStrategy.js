import { Strategy as FacebookStrategy } from 'passport-facebook';
import socialAuthController from '../api/controllers/socialAuthController';
import 'dotenv/config';

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BASE_URL}/customers/facebook/callback`,
    profileFields: ['email', 'displayName'],
  },
  socialAuthController.passportCallback
);

export default facebookStrategy;
