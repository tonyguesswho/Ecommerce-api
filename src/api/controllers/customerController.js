import { Customer } from '../../models';
import helpers from '../../helpers/util';

const {
  validateRegisterDetails,
  validateLoginDetails,
  hashPassword,
  createToken,
  errorResponse,
  comparePasswords
} = helpers;

/**
 * @export
 * @class CustomerController
 * @description Performs operations on the customer
 */
class CustomerController {
  /**
    * @description -This method registers a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async register(req, res) {
    const { name, email, password } = req.body;
    try {
      const { error } = validateRegisterDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.findByEmail(email);
      if (existingCustomer) return errorResponse(res, 409, 'USR_04', 'The email already exists.', 'email');

      const hashedPassword = await hashPassword(password);
      const customer = await Customer.create({
        name,
        email,
        password: hashedPassword,
      });
      await customer.reload();
      delete customer.dataValues.password;
      const token = createToken(customer);
      return res.status(200).json({
        accessToken: `Bearer ${token}`,
        customer,
        expires_in: '24h'
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  /**
    * @description -This method logins a customer
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - customer and accessToken
    */
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const { error } = validateLoginDetails(req.body);
      if (error) {
        const errorField = error.details[0].context.key;
        const errorMessage = error.details[0].message;
        return errorResponse(res, 400, 'USR_01', errorMessage, errorField);
      }

      const existingCustomer = await Customer.findByEmail(email);

      if (!existingCustomer) return errorResponse(res, 400, 'USR_05', "The email doesn't exist", 'email');
      const match = await comparePasswords(password, existingCustomer.dataValues.password);

      if (match) {
        delete existingCustomer.dataValues.password;
        const customer = existingCustomer.dataValues;
        const token = createToken(customer);
        res.status(200).json({
          accessToken: `Bearer ${token}`,
          customer,
          expires_in: '24h'
        });
      } else {
        return errorResponse(res, 400, 'USR_01', 'Email or Password is invalid.');
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default CustomerController;
