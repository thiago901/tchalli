import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import ListProductService from '@modules/products/services/ListProductService';

class ProductsControllers {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, description, color, size } = req.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({
      name,
      description,
      color,
      size,
    });
    return resp.json(product);
  }

  public async update(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, color, size } = req.body;

    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id,
      name,
      description,
      color,
      size,
    });
    return resp.json(product);
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute({
      id,
    });
    return resp.json(product);
  }

  public async index(req: Request, resp: Response): Promise<Response> {
    const listProductService = container.resolve(ListProductService);
    const products = await listProductService.execute();
    return resp.json(products);
  }
}
export default ProductsControllers;
