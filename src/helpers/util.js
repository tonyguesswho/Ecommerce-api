import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi'
import 'dotenv/config';

const loginSchema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(50).required()
  };

const registerSchema =  {
  email: Joi.string().min(5).max(100).required().email(),
  password: Joi.string().min(5).max(50).required(),
  name:Joi.string().min(1).max(50).required()
};



const options =  {language: {key: '{{key}} '}}

module.exports = {
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  },
  async comparePasswords(password, userPassword) {
    const match = await bcrypt.compare(password, userPassword);
    return match;
  },
  createToken(user) {
    console.log(user)
    const {customer_id:customerId, name, email } = user
    return jwt.sign({customerId,name,email}, process.env.SECRET, { expiresIn: 86400 });
  },

  validateRegisterDetails(user){
    return Joi.validate(user, registerSchema, options);
  },

  validateLoginDetails(user){
    return Joi.validate(user, loginSchema, options);
  },

  errorResponse(res,status,code,message, field){
    return res.status(status).json({
      "error": {
        status,
        code,
        message,
        field:field || ''
      }
    });

  }

};
