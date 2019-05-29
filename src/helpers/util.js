import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import 'dotenv/config';
import schema from './validationSchema';

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
    return jwt.sign({ customer_id: customerId, name, email }, process.env.SECRET, { expiresIn: 86400 });
  },

  validateRegisterDetails(user) {
    return Joi.validate(user, schema.registerSchema, options);
  },

  validateLoginDetails(user) {
    return Joi.validate(user, schema.loginSchema, options);
  },
  validateAddressDetails(user) {
    return Joi.validate(user, schema.addressSchema, options);
  },
  validateCardDetails(user) {
    return Joi.validate(user, schema.cardSchema, options);
  },
  validateCustomerDetails(user) {
    return Joi.validate(user, schema.customerSchema, options);
  },
  validateCartDetails(user) {
    return Joi.validate(user, schema.shoppingCartSchema, options);
  },
  validateOrderDetails(user) {
    return Joi.validate(user, schema.orderSchema, options);
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
