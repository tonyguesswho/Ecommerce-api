import express from 'express';
import api from './api';
import cors from 'cors';
import bodyParser from 'body-parser'
import passport from 'passport';
import facebookStrategy from './config/facebookStrategy';


const app = express();
const { PORT = 3000 } = process.env;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', api);
passport.use(facebookStrategy);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });


export default app;