import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/infra/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  description: string;
  color: string;
  size: string;
}
@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    color,
    description,
    size,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    product.name = name;
    product.color = color;
    product.description = description;
    product.size = size;

    await this.productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
