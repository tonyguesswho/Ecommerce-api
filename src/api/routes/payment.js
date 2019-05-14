import { Router } from 'express';
import PaymentController from '../controllers/paymentController';
import authenticate from '../../middlewares/authenticate';

const paymentRouter = Router();

paymentRouter.post('/charge', authenticate, PaymentController.paymentWithStripe);


export default paymentRouter;
