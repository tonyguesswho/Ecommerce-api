import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { errorResponse } from '../helpers/util';

// check and authenticate request token
const validateToken = (req, res, next) => {
    let token = req.headers['user-key'];
    if (!token) {
        return errorResponse(res, 401, "AUT_01", "Authorization code is empty")
    }
    if (token.split(' ')[0] !== 'Bearer') {
        return errorResponse(res, 401, "AUT_03", "Invalid token supplied")
    }
    token = token.split(' ')[1];
    jwt.verify(token,  process.env.SECRET, (err, decoded) => {
      if (err) {
        return errorResponse(res, 401, "AUT_03", "Invalid token supplied")
      }
      req.user = decoded.user;
      next();
    });
  }
export default validateToken
