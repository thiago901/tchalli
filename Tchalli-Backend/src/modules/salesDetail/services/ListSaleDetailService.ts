import { inject, injectable } from 'tsyringe';

import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';

import ISalesDetailRepository from '@modules/salesDetail/infra/repositories/ISalesDetailRepository';

interface IRequest {
  date: Date;
}
@injectable()
class ListSaleDetailService {
  constructor(
    @inject('SalesDetailRepository')
    private salesDetailRepository: ISalesDetailRepository,
  ) {}

  public async execute({ date }: IRequest): Promise<SaleDetail[]> {
    const sales = await this.salesDetailRepository.findAll({
      date,
    });
    return sales;
  }
}

export default ListSaleDetailService;
