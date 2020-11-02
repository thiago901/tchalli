import { inject, injectable } from 'tsyringe';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import ICreateSaleDTO from '../dtos/ICreateSaleDTO';

@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({ type, amount, price }: ICreateSaleDTO): Promise<Sale> {
    const sale = await this.salesRepository.create({
      amount,
      price,
      type,
    });
    return sale;
  }
}

export default CreateSaleService;
