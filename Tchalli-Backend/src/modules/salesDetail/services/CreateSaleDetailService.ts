import { inject, injectable } from 'tsyringe';

import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';
import ISalesDetailRepository from '@modules/salesDetail/infra/repositories/ISalesDetailRepository';

interface IRequest {
  sale_id: string;
  amount: number;
  price: number;
  product_id: string;
}
@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesDetailRepository')
    private salesDetailRepository: ISalesDetailRepository,
  ) {}

  public async execute(saleDetail: IRequest[]): Promise<SaleDetail[]> {
    const sales = await this.salesDetailRepository.createMany(saleDetail);
    return sales;
  }
}

export default CreateSaleService;
