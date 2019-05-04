
import express from 'express';
import customerRouter from './routes/customer';

const router = express.Router();

router.use('/customers', customerRouter)

export default router;