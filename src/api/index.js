
import express from 'express';
import customerRouter from './routes/customer';
import productRouter from './routes/products';
import shoppingCartRouter from './routes/shoppingCart';
import taxRouter from './routes/tax';
import orderRouter from './routes/order';
import paymentRouter from './routes/payment';
import shippingRouter from './routes/shipping';

const router = express.Router();

router.use('/customers', customerRouter);
router.use('/customer', customerRouter);
router.use('/products', productRouter);
router.use('/shoppingcart', shoppingCartRouter);
router.use('/tax', taxRouter);
router.use('/orders', orderRouter);
router.use('/stripe', paymentRouter);
router.use('/shipping/regions', shippingRouter);

export default router;
