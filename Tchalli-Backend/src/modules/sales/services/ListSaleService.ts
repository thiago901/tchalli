import { inject, injectable } from 'tsyringe';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';

interface IRequest {
  date: Date;
}
@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({ date }: IRequest): Promise<Sale[]> {
    const sales = await this.salesRepository.findAll({
      date,
    });
    return sales;
  }
}

export default CreateSaleService;
