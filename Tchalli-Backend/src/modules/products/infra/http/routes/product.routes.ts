import { Router } from 'express';

import ProductsController from '@modules/products/infra/http/controllers/ProductsControllers';

const route = Router();
const productController = new ProductsController();
route.post('/', productController.create);
route.put('/:id', productController.update);
route.get('/', productController.index);
route.get('/:id', productController.show);

export default route;
