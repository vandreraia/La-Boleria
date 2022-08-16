import { Router } from 'express';
import cakeRouter from './cakeRouter.js';
import clientsRouter from './clientsRouter.js';
import orderRouter from './orderRouter.js';

const router = Router();

router.use(cakeRouter);
router.use(clientsRouter);
router.use(orderRouter);

export default router;