import { inject, injectable } from 'tsyringe';

import Acquisition from '@modules/acquisition/infra/typeorm/entities/Acquistion';
import IAcquisitionRepository from '@modules/acquisition/infra/repositories/IAcquisitionRepository';
import IProductsRepository from '@modules/products/infra/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  amount: number;
  cost_price: number;
  product_id: string;
}
@injectable()
class CreateAcquisitonService {
  constructor(
    @inject('AcquisitionRepository')
    private acquisitionsRepository: IAcquisitionRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    amount,
    cost_price,
    product_id,
  }: IRequest): Promise<Acquisition> {
    const product = await this.productsRepository.findById(product_id);
    if (!product) {
      throw new AppError('Product not found');
    }
    const acquisition = await this.acquisitionsRepository.create({
      amount,
      cost_price,
      product_id,
    });
    return acquisition;
  }
}

export default CreateAcquisitonService;
