import { Router } from 'express';

import AcquisitionControllers from '@modules/acquisition/infra/http/controllers/AcquisitionControllers';

const route = Router();
const acquisitionControllers = new AcquisitionControllers();
route.post('/', acquisitionControllers.create);
route.get('/:id', acquisitionControllers.show);
route.get('/', acquisitionControllers.index);

export default route;
