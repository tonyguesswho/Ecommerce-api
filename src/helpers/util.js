import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import 'dotenv/config';

const loginSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required()
};

const customerSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50),
  name: Joi.string().min(1).max(50).required(),
  day_phone: Joi.string(),
  eve_phone: Joi.string(),
  mob_phone: Joi.string()
};
const registerSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required(),
  name: Joi.string().min(1).max(50).required()
};

const addressSchema = {
  address_1: Joi.string().required(),
  address_2: Joi.string(),
  city: Joi.string().required(),
  region: Joi.string().required(),
  postal_code: Joi.string().required(),
  country: Joi.string().required(),
  shipping_region_id: Joi.number().required(),
};

const cardSchema = {
  credit_card: Joi.string().required()
};


const options = { language: { key: '{{key}} ' } };

export default {
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  },
  async comparePasswords(password, userPassword) {
    const match = await bcrypt.compare(password, userPassword);
    return match;
  },
  createToken(user) {
    const { customer_id: customerId, name, email } = user;
    return jwt.sign({ customerId, name, email }, process.env.SECRET, { expiresIn: 86400 });
  },

  validateRegisterDetails(user) {
    return Joi.validate(user, registerSchema, options);
  },

  validateLoginDetails(user) {
    return Joi.validate(user, loginSchema, options);
  },
  validateAddressDetails(user) {
    return Joi.validate(user, addressSchema, options);
  },
  validateCardDetails(user) {
    return Joi.validate(user, cardSchema, options);
  },
  validateCustomerDetails(user) {
    return Joi.validate(user, customerSchema, options);
  },

  errorResponse(res, status, code, message, field) {
    return res.status(status).json({
      error: {
        status,
        code,
        message,
        field: field || ''
      }
    });
  },

  truncateDescription(products, descriptionLength) {
    const allProducts = products.map((product) => {
      const { length } = product.dataValues.description;
      if (length > descriptionLength) {
        product.dataValues.description = `${product.dataValues.description.slice(0, descriptionLength)}...`;
      }
      return product;
    });
    return allProducts;
  }
};
