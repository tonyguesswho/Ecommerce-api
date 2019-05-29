/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
import 'dotenv/config';
import { Tax } from '../../models';
import helpers from '../../helpers/util';

const { errorResponse } = helpers;


/**
 * @export
 * @class TaxController
 * @description Handles tax related actions
 */
class TaxController {
  /**
      * @description -This method gets all taxes
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - taxes
      */
  static async getAllTaxes(req, res) {
    const taxes = await Tax.findAll();
    return res.status(200).json(taxes);
  }

  /**
      * @description -This method gets a single tax detail
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - tax
      */
  static async getTax(req, res) {
    const { taxId } = req.params;
    try {
      if (isNaN(taxId)) return errorResponse(res, 400, 'USR_01', 'tax id must be a number', 'tax id');
      const tax = await Tax.findOne({
        where: { tax_id: taxId }
      });
      if (tax) return res.status(200).json(tax);
      return errorResponse(res, 404, 'PRO_01', 'Tax Not found', 'tax');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default TaxController;
