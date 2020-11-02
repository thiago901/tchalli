import { inject, injectable } from 'tsyringe';

import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  product_id: string;
  price: number;
}
@injectable()
class ListStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({ price, product_id }: IRequest): Promise<Stock> {
    const stock = await this.stockRepository.findByProduct(product_id);
    if (!stock) {
      throw new AppError('Product not found');
    }
    stock.price = price;

    await this.stockRepository.save(stock);
    return stock;
  }
}

export default ListStockService;
