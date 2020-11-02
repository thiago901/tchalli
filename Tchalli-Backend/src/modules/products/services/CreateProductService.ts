import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/infra/repositories/IProductsRepository';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    color,
    description,
    size,
  }: ICreateProductsDTO): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      color,
      description,
      size,
    });
    return product;
  }
}

export default CreateProductService;
