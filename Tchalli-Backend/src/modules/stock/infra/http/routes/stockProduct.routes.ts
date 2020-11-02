import { Router } from 'express';

import StockProductControllers from '@modules/stock/infra/http/controllers/StockProductControllers';

const route = Router();
const stockProductControllers = new StockProductControllers();

route.get('/:product_id', stockProductControllers.show);

export default route;
