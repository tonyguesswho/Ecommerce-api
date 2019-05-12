import { Router } from 'express';
import orderController from '../controllers/orderController';
import authenticate from '../../middlewares/authenticate';

const orderRouter = Router();

orderRouter.post('/', authenticate, orderController.createOrder);
orderRouter.get('/:orderId', orderController.getOrderInfo);

export default orderRouter;
