/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
import 'dotenv/config';
import { ShoppingRegion } from '../../models';
import helpers from '../../helpers/util';

const { errorResponse } = helpers;


/**
 * @export
 * @class ShippingController
 * @description Handles shipping regions related actions
 */
class ShippingController {
  /**
      * @description -This method gets all shipping regions
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - regions
      */
  static async getShippingRegions(req, res) {
    const regions = await ShoppingRegion.findAll();
    return res.status(200).json(regions);
  }

  /**
      * @description -This method gets a single shipping region detail
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - tax
      */
  static async getShippingRegion(req, res) {
    const { regionId } = req.params;
    try {
      if (isNaN(regionId)) return errorResponse(res, 400, 'SHP_01', 'shipping region id must be a number', 'shipping region id');
      const region = await ShoppingRegion.findOne({
        where: { shipping_region_id: regionId }
      });
      if (region) return res.status(200).json(region);
      return errorResponse(res, 404, 'SHP_01', 'Shipping region Not found', 'shipping region');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ShippingController;
