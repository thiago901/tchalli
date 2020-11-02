import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ISalesRepository from '../infra/repositories/ISalesRepository';
import Sale from '../infra/typeorm/entities/Sale';

interface IRequest {
  id: string;
}
@injectable()
class ShowSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Sale> {
    const sales = await this.salesRepository.findById(id);
    if (!sales) {
      throw new AppError('Sale not found');
    }
    return sales;
  }
}

export default ShowSaleService;
