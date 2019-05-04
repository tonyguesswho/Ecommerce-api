import 'dotenv/config';
import { Customer } from '../../models';
import helpers from '../../helpers/util';

const { createToken } = helpers;

/**
 * @export
 * @class SocialLoginController
 * @description Login with social accounts
 */
class SocialAuthController {
  /**
   * @description - find or create customer
   * @param {object} profile
   * @param {function} done
   * @returns {object} customer
   */
  static async createCustomer(profile, done) {
    const customerData = {
      email: profile.email,
      name: profile.name
    };
    try {
      await Customer.findOrCreate({
        where: { email: customerData.email },
        defaults: { name: customerData.name, password: 'facebook' },
      }).spread((customer) => {
        customer.reload();
        delete customer.dataValues.password;
        customer = customer.dataValues;
        done(null, {
          customer
        });
      });
    } catch (error) {
      done(null, null);
    }
  }

  /**
   * @description - callback function for passport strategy
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile
   * @param {function} done
   * @returns {json} json
   */
  static passportCallback(accessToken, refreshToken, profile, done) {
    const customerProfile = {
      email: profile.emails[0].value,
      name: profile.displayName
    };
    SocialAuthController.createCustomer(customerProfile, done);
  }

  /**
    * @description returns customer authentication details
    * @static
    * @param {object} req
    * @param {object} res
    * @returns {json} json
  */
  static authResponse(req, res) {
    const { customer } = req.user;
    const token = createToken(customer);
    res.status(200).json({ customer, accessToken: `Bearer ${token}`, expires_in: '24hr' });
  }
}

export default SocialAuthController;
