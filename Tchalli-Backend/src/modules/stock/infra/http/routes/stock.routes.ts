import { Router } from 'express';

import StockControllers from '@modules/stock/infra/http/controllers/StockControllers';

const route = Router();
const stockControllers = new StockControllers();

route.put('/product/:product_id', stockControllers.update);
route.get('/', stockControllers.index);
route.get('/:id', stockControllers.show);
route.post('/', stockControllers.create);

export default route;
