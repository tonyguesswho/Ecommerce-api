import Joi from '@hapi/joi';

const loginSchema = {
  email: Joi.string().min(5).max(100).required()
    .email(),
  password: Joi.string().min(5).max(50).required()
};

const customerSchema = {
  email: Joi.string().min(5).max(100)
    .email(),
  password: Joi.string().min(5).max(50),
  name: Joi.string().min(1).max(50),
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

const shoppingCartSchema = {
  cart_id: Joi.required(),
  product_id: Joi.number().required(),
  attributes: Joi.required()

};

const orderSchema = {
  cart_id: Joi.required(),
  shipping_id: Joi.number().required(),
  tax_id: Joi.number().required(),
  status: Joi.number(),
  reference: Joi.string(),
  auth_code: Joi.string(),
  comments: Joi.string(),
  shipped_on: Joi.date()

};

const cardSchema = {
  credit_card: Joi.string().required()
};

export default {
  loginSchema,
  cardSchema,
  orderSchema,
  shoppingCartSchema,
  addressSchema,
  registerSchema,
  customerSchema
};
