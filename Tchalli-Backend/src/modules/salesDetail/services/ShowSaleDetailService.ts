import { inject, injectable } from 'tsyringe';

import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';

import ISalesDetailRepository from '@modules/salesDetail/infra/repositories/ISalesDetailRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}
@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesDetailRepository')
    private salesDetailRepository: ISalesDetailRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<SaleDetail[]> {
    const sales = await this.salesDetailRepository.findBySaleId(id);
    if (!sales.length) {
      throw new AppError('Sales details not found');
    }
    return sales;
  }
}

export default CreateSaleService;
