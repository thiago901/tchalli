import { Router } from 'express';

import SalesControllers from '@modules/salesDetail/infra/http/controllers/SalesDetailControllers';

const route = Router();
const salesControllers = new SalesControllers();
route.get('/', salesControllers.index);
route.post('/', salesControllers.create);
route.get('/:id', salesControllers.show);

export default route;
