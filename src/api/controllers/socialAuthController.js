import 'dotenv/config';
import request from 'request';
import { Customer } from '../../models';
import helpers from '../../helpers/util';

const { createToken, errorResponse } = helpers;

/**
 * @export
 * @class SocialLoginController
 * @description Login with social accounts
 */
class SocialAuthController {
  /**
    * @description returns customer authentication details
    * @static
    * @param {object} req
    * @param {object} res
    * @returns {json} json
  */
  static async facebookAuth(req, res) {
    const { access_token: facebookToken } = req.body;
    if (!facebookToken) return errorResponse(res, 400, 'USR_01', 'Access Token is required', 'facebook');
    try {
      if (facebookToken) {
        const path = `https://graph.facebook.com/v3.3/me?access_token=${facebookToken}&fields=id,name,email`;
        request(path, async (error, response, body) => {
          const userDetails = JSON.parse(body);
          if (!error && response && response.statusCode && response.statusCode === 200) {
            const customer = await Customer.scope('withoutPassword').findOrCreate({
              where: { email: userDetails.email },
              defaults: { name: userDetails.name, password: 'facebook' },
            });
            if (customer[1]) {
              delete customer[0].dataValues.password;
            }
            const token = createToken(customer[0]);
            res.status(200).json({ customer: customer[0], accessToken: `Bearer ${token}`, expires_in: '24hr' });
          } else {
            return errorResponse(res, 500, 'USR_01', 'Access Forbidden', 'facebook');
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default SocialAuthController;
