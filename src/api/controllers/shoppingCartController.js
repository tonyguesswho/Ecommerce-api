/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import crypto from 'crypto';
import getCart from '../../helpers/shoppingCart';
import helpers from '../../helpers/util';
import db from '../../models';

const { ShoppingCart, Product } = db;
const { errorResponse, validateCartDetails } = helpers;


/**
 *
 *
 * @export
 * @class ShoppingCartController
 * @description Operations on Products
 */
export default class ShoppingCartController {
  /**
    * @description -This method generates a unique id
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - unique id
    */
  static async generateUniqueId(req, res) {
    try {
      const uniqueId = await crypto.randomBytes(16).toString('hex');
      if (uniqueId) {
        return res.status(200).json({ cart_id: uniqueId });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
    * @description -This method adds a  product to cart
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - adds a product to cart
    */
  static async addProductToCart(req, res) {
    try {
      const { cart_id: cartId, product_id: productId, attributes } = req.body;
      const { error } = validateCartDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'PRD_01', errorMessage, errorField);
      }

      const product = await Product.findOne({
        where: { product_id: productId },
      });
      if (product) {
        const existingCart = await ShoppingCart.findOne({
          where: { cart_id: cartId, product_id: productId, attributes },
        });
        if (!existingCart) {
          await ShoppingCart.create({
            cart_id: cartId,
            product_id: productId,
            quantity: 1,
            added_on: Date.now(),
            attributes,
          });
        } else {
          const quantity = existingCart.quantity + 1;
          await existingCart.update({
            cart_id: cartId,
            product_id: productId,
            quantity,
            attributes,
          });
        }
        const cartItems = await ShoppingCart.findAll({
          where: { cart_id: cartId },
          include: [{
            model: Product,
          }]
        });
        const shoppingCartItems = getCart(cartItems);
        res.status(200).json(shoppingCartItems);
      } else {
        return res.status(404).json({
          error: {
            status: 404,
            message: 'Product cannot be found',
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
      * @description -This method gets products in cart
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {array} - cart products
      */
  static async getProductsInCart(req, res) {
    try {
      const { cart_id: cartId } = req.params;
      const cartItems = await ShoppingCart.findAll({
        where: { cart_id: cartId },
        include: [{
          model: Product
        }]
      });
      if (cartItems.length > 0) {
        const shoppingCartItems = getCart(cartItems);
        res.status(200).json(shoppingCartItems);
      } else {
        return errorResponse(res, 400, 'PRD_01', 'Cart id  does not exist', 'cart Id');
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  /**
    * @description -This method clears the cart
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - empty cart
    */
  static async emptyCart(req, res) {
    try {
      const { cart_id: cartId } = req.params;
      await ShoppingCart.destroy({
        where: { cart_id: cartId }
      });
      res.status(200).json([]);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
    * @description -This method removes an item from the cart
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {array} - empty cart
    */
  static async removeProduct(req, res) {
    try {
      const { item_id: itemId } = req.params;

      const item = await ShoppingCart.findOne({ where: { item_id: itemId } });
      if (!item) {
        return errorResponse(res, 404, 'CART_01', 'No item found', 'item_id');
      }
      const query = `CALL shopping_cart_remove_product(${itemId});`;
      await db.sequelize.query(query);
      return res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
