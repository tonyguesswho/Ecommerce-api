import { Router } from 'express';
import ShippingController from '../controllers/shippingController';

const shippingRouter = Router();

shippingRouter.get('/:regionId', ShippingController.getShippingRegion);
shippingRouter.get('/', ShippingController.getShippingRegions);


export default shippingRouter;
