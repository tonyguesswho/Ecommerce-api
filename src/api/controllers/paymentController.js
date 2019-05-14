import 'dotenv/config';
import stripe from 'stripe';

const key = process.env.STRIPE_KEY;
const Stripe = stripe(key);


/**
 *
 *
 * @export
 * @class PaymentController
 * @description Payment with stripe
 */
export default class PaymentController {
  /**
    * @description -This method charges on stripe
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - charge and message
    */
  static async paymentWithStripe(req, res) {
    const {
      order_id: orderId, description, amount, currency, stripeToken
    } = req.body;
    const { email } = req.user;
    try {
      const customer = await Stripe.customers.create({
        email,
        source: stripeToken
      });
      const charge = await Stripe.charges.create({
        amount,
        description,
        currency,
        customer: customer.id,
        metadata: { order_id: orderId },
      });
      res.status(200).json({ charge, message: 'Payment processed' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
