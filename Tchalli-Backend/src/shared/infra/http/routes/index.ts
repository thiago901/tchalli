import { Router } from 'express';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';
import usersProvidersRoute from '@modules/users/infra/http/routes/usersProviders.routes';
import profileRoute from '@modules/users/infra/http/routes/profile.routes';
import sessionsRoute from '@modules/users/infra/http/routes/sessions.routes';
import usersRoute from '@modules/users/infra/http/routes/users.routes';
import productRoute from '@modules/products/infra/http/routes/product.routes';
import acquisitionRoute from '@modules/acquisition/infra/http/routes/acquisition.routes';
import stockRoute from '@modules/stock/infra/http/routes/stock.routes';
import stockProductRoute from '@modules/stock/infra/http/routes/stockProduct.routes';
import salesRoute from '@modules/sales/infra/http/routes/sales.routes';
import salesDateilRoute from '@modules/salesDetail/infra/http/routes/salesDatail.routes';

const router = Router();

router.use('/users', usersRoute);
router.use('/sessions', sessionsRoute);
router.use('/profile', profileRoute);
router.use('/password', passwordRoute);
router.use('/usersprovider', usersProvidersRoute);
router.use('/products', productRoute);
router.use('/acquisitions', acquisitionRoute);
router.use('/stock', stockRoute);
router.use('/stock/product', stockProductRoute);
router.use('/sales', salesRoute);
router.use('/salesdetail', salesDateilRoute);
export default router;
