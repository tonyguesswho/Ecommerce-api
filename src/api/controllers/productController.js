/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */

import 'dotenv/config';
import { Op } from 'sequelize';
import redis from 'async-redis';
import helpers from '../../helpers/util';
import db from '../../models';

const redisClient = redis.createClient(process.env.REDIS_URL);

const { Product } = db;


const {
  errorResponse,
  truncateDescription
} = helpers;


/**
 *
 *
 * @export
 * @class ProductController
 * @description Operations on Products
 */
export default class ProductController {
  /**
    * @description -This method returns all products
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - number of total products
    */
  static async getAllProducts(req, res) {
    try {
      const { description_length: descriptionLength, limit, page } = req.query;
      const productsQuery = {
        limit: parseInt(limit) || 20,
        offset: (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0
      };
      let products;
      const redisProducts = await redisClient.get('cacheKey');
      if (redisProducts) {
        products = JSON.parse(redisProducts);
        return res.status(200).json({ count: products.count, rows: products.rows });
      }
      products = await Product.findAll(productsQuery);

      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const totalProducts = await Product.count();
      await redisClient.set('cacheKey', JSON.stringify({ count: totalProducts, rows: products }), 'EX', 10);
      return res.status(200).json({ count: totalProducts, rows: products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
      * @description -This method views a single product
     * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the method
    * @returns {object} - product
      */
  static async getSingleProduct(req, res) {
    try {
      const { product_id: productId } = req.params;
      if (isNaN(productId)) return errorResponse(res, 400, 'USR_01', 'Product id must be a number', 'product id');

      const product = await Product.findOne({
        where: { product_id: productId }
      });
      if (product) return res.status(200).json(product);
      return errorResponse(res, 404, 'PRO_01', 'Product Not found', 'product');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
    * @description -This method search products
    * @param {object} req - The request payload
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - products
    */
  static async searchProducts(req, res) {
    try {
      const {
        page, limit, description_length: descriptionLength, query_string: queryString, all_words: allWords
      } = req.query;
      if (!queryString) {
        errorResponse(res, 400, 'USR_01', 'Query string is required', 'query_string');
      }
      let query;
      if (allWords === 'on') {
        query = {
          where: {
            [Op.or]: [{
              name: { [Op.like]: `${queryString}` },
            }, {
              description: { [Op.like]: `${queryString}` }
            }]
          },
        };
      } else {
        query = {
          where: {
            [Op.or]: [{
              name: { [Op.like]: `%${queryString}%` },
            }, {
              description: { [Op.like]: `%${queryString}%` }
            }]
          },
        };
      }
      query.limit = parseInt(limit) || 20;
      query.offset = (parseInt(limit || 20) * ((parseInt(page) - 1))) || 0;
      let products = await Product.findAll(query);
      if (descriptionLength) {
        products = truncateDescription(products, descriptionLength);
      }
      const count = products.length;
      return res.status(200).json({ count, rows: products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
      * @description -This method gets products in a category
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - products in category
      */
  static async getProductsInCategory(req, res) {
    try {
      const { categoryId } = req.params;
      if (!categoryId) {
        errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id');
      }
      if (isNaN(categoryId)) return errorResponse(res, 400, 'USR_01', 'Category id must be a number', 'category id');
      const { page, limit = 20, description_length: descriptionLength = 200 } = req.query;
      let startIndex = 0;
      if (page) startIndex = (page - 1) * limit;

      const query = 'CALL catalog_get_products_in_category(:categoryId,:descriptionLength,:limit,:startIndex)';
      const products = await db.sequelize.query(query, {
        replacements: {
          categoryId, descriptionLength, limit, startIndex
        }
      });
      const count = products.length;
      return res.status(200).json({ count, rows: products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
      * @description -This method gets products in a department
      * @param {object} req - The request payload sent from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - products in department
      */
  static async getProductsInDepartment(req, res) {
    try {
      const { departmentId } = req.params;
      if (!departmentId) {
        errorResponse(res, 400, 'USR_01', 'Category Id is required', 'category id');
      }
      if (isNaN(departmentId)) return errorResponse(res, 400, 'USR_01', 'department id must be a number', 'department id');
      const { page, limit = 20, description_length: descriptionLength = 200 } = req.query;
      let startIndex = 0;
      if (page) startIndex = (page - 1) * limit;

      const query = 'CALL catalog_get_products_on_department(:departmentId,:descriptionLength,:limit,:startIndex)';
      const products = await db.sequelize.query(query, {
        replacements: {
          departmentId, descriptionLength, limit, startIndex
        }
      });
      const count = products.length;
      return res.status(200).json({ count, rows: products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
