import { inject, injectable } from 'tsyringe';

import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';

// import AppError from '@shared/errors/AppError';

interface IRequest {
  availability?: boolean;
}
@injectable()
class ListStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({ availability }: IRequest): Promise<Stock[]> {
    const stocks = await this.stockRepository.findAll({ availability });

    return stocks;
  }
}

export default ListStockService;
