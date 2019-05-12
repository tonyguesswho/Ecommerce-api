/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import helpers from '../../helpers/util';
import getCart from '../../helpers/shoppingCart';
import getTotalAmount from '../../helpers/order';
import orderEmail from '../../helpers/emails';

import db from '../../models';

const { Order, ShoppingCart, Product } = db;


const {
  errorResponse,
  validateOrderDetails,
} = helpers;


/**
 *
 *
 * @export
 * @class OrderController
 * @description Operations on Orders
 */
export default class OrderController {
  /**
    * @description -This method creates an order
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - order id
    */
  static async createOrder(req, res) {
    try {
      const {
        cart_id: cartId,
        shipping_id: shippingId,
        tax_id: taxId,
        shipped_on: shippedOn,
        comments,
        status,
        reference,
        auth_code: authCode
      } = req.body;

      const { error } = validateOrderDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'ORD_01', errorMessage, errorField);
      }
      const cartItems = await ShoppingCart.findAll({
        where: { cart_id: cartId },
        include: [{
          model: Product
        }]
      });
      let shoppingCartItems = [];
      if (cartItems.length > 0) {
        shoppingCartItems = getCart(cartItems);
      }
      const totalAmount = getTotalAmount(shoppingCartItems);
      const order = await Order.create({
        cart_id: cartId,
        shipping_id: shippingId,
        tax_id: taxId,
        comments,
        status,
        total_amount: totalAmount,
        reference,
        auth_code: authCode,
        customer_id: req.user.customerId,
        shipped_on: shippedOn,
        created_on: Date.now(),
      });
      await orderEmail(req.user);
      res.status(200).json({ orderId: order.order_id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
      * @description -This method views an order
     * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - order
      */
  static async getOrderInfo(req, res) {
    try {
      const { orderId } = req.params;
      if (isNaN(orderId)) return errorResponse(res, 400, 'ORD_01', 'Order id must be a number', 'order id');

      const order = await Order.findOne({
        where: { order_id: orderId }
      });
      if (order) return res.status(200).json(order);
      return errorResponse(res, 404, 'ORD_01', 'Order Not found', 'order');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
