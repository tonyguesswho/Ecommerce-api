import { Router } from 'express';
import taxController from '../controllers/taxController';

const taxRouter = Router();

taxRouter.get('/', taxController.getAllTaxes);
taxRouter.get('/:taxId', taxController.getTax);

export default taxRouter;
