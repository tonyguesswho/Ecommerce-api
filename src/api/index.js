
import express from 'express';
import customerRouter from './routes/customer';
import productRouter from './routes/products';
import shoppingCartRouter from './routes/shoppingCart';
import taxRouter from './routes/tax';
import shippingRouter from './routes/shipping';

const router = express.Router();

router.use('/customers', customerRouter);
router.use('/customer', customerRouter);
router.use('/products', productRouter);
router.use('/shoppingcart', shoppingCartRouter);
router.use('/tax', taxRouter);
router.use('/shipping/regions', shippingRouter);

export default router;
