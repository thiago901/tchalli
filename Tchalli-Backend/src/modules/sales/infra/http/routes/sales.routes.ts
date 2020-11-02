import { Router } from 'express';

import SalesControllers from '@modules/sales/infra/http/controllers/SalesControllers';

const route = Router();
const salesControllers = new SalesControllers();
route.post('/', salesControllers.create);
route.get('/', salesControllers.index);
route.get('/:id', salesControllers.show);

export default route;
