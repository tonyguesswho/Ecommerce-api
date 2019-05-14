import { Router } from 'express';
import productController from '../controllers/productController';
// import authenticate from '../../middlewares/authenticate';


const productRouter = Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/incategory', productController.getProductsInCategory);
productRouter.get('/inDepartment', productController.getProductsInDepartment);
productRouter.get('/incategory/:categoryId', productController.getProductsInCategory);
productRouter.get('/inDepartment/:departmentId', productController.getProductsInDepartment);
productRouter.get('/search', productController.searchProducts);
productRouter.get('/:product_id', productController.getSingleProduct);


export default productRouter;
