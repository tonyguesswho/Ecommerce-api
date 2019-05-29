import { Router } from 'express';
import ShoppingCartController from '../controllers/shoppingCartController';

const productRouter = Router();

productRouter.get('/generateUniqueId', ShoppingCartController.generateUniqueId);
productRouter.post('/add', ShoppingCartController.addProductToCart);
productRouter.get('/:cart_id', ShoppingCartController.getProductsInCart);
productRouter.delete('/empty/:cart_id', ShoppingCartController.emptyCart);
productRouter.delete('/removeProduct/:item_id', ShoppingCartController.removeProduct);


export default productRouter;
