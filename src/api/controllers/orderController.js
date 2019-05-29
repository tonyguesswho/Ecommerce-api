/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import helpers from '../../helpers/util';
import orderEmail from '../../helpers/emails';

import db from '../../models';

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
      } = req.body;
      const { customer_id: customerId } = req.user;

      const { error } = validateOrderDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'ORD_01', errorMessage, errorField);
      }
      const createOrderQuery = 'CALL shopping_cart_create_order(:cartId,:customerId,:shippingId,:taxId)';
      const order = await db.sequelize.query(createOrderQuery, {
        replacements: {
          cartId, customerId, shippingId, taxId
        }
      });
      const orderDetailsquery = `CALL orders_get_order_info(${order[0].orderId})`;
      const orderDetails = await db.sequelize.query(orderDetailsquery);
      await orderEmail(req.user, orderDetails);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
      * @description -This gets details of an order
     * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - order
      */
  static async getOrderInfo(req, res) {
    try {
      const { orderId } = req.params;
      if (isNaN(orderId)) return errorResponse(res, 400, 'ORD_01', 'Order id must be a number', 'order id');
      const query = `CALL orders_get_order_info(${orderId})`;
      const order = await db.sequelize.query(query);
      if (order.length > 0) return res.status(200).json(order);
      return errorResponse(res, 404, 'ORD_01', 'Order Not found', 'order');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
