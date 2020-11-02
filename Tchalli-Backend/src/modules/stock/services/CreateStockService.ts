import { inject, injectable } from 'tsyringe';

import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';
import ICreateStockDTO from '@modules/stock/dtos/ICreateStockDTO';

// import AppError from '@shared/errors/AppError';

@injectable()
class CreateStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({
    amount,
    product_id,
    price,
    availability,
  }: ICreateStockDTO): Promise<Stock> {
    const stockExists = await this.stockRepository.findByProduct(product_id);
    if (stockExists) {
      stockExists.amount += Number(amount);
      stockExists.availability = availability;
      stockExists.price = price;

      const stock = await this.stockRepository.save(stockExists);

      return stock;
    }
    const stock = await this.stockRepository.create({
      amount,
      price,
      availability,
      product_id,
    });
    return stock;
  }
}

export default CreateStockService;
