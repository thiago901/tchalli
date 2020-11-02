import { inject, injectable } from 'tsyringe';

import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';
import AppError from '@shared/errors/AppError';

// import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}
@injectable()
class ShowStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Stock> {
    const stocks = await this.stockRepository.findById(id);
    if (!stocks) {
      throw new AppError('Stock not found');
    }
    return stocks;
  }
}

export default ShowStockService;
