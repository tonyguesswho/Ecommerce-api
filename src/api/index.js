
import express from 'express';
import customerRouter from './routes/customer';
import productRouter from './routes/products';

const router = express.Router();

router.use('/customers', customerRouter);
router.use('/customer', customerRouter);
router.use('/products', productRouter);

export default router;
