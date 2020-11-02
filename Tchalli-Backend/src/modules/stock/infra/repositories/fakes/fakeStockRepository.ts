import { v4 } from 'uuid';
import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';
import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import ICreateStockDTO from '@modules/stock/dtos/ICreateStockDTO';
import IFindAllStockDTO from '@modules/stock/dtos/IFindAllStockDTO';

export default class fakeProductRepository implements IStockRepository {
  private ormRepository: Stock[] = [];

  public async create({
    amount,
    price,
    product_id,
    availability,
  }: ICreateStockDTO): Promise<Stock> {
    const stock = new Stock();
    Object.assign(stock, {
      id: v4(),
      amount,
      price,
      product_id,
      availability,
    });
    this.ormRepository.push(stock);
    return stock;
  }

  public async save(stock: Stock): Promise<Stock> {
    const stockIndex = this.ormRepository.findIndex(s => s.id === stock.id);
    this.ormRepository[stockIndex] = stock;
    return stock;
  }

  public async findAll({ availability }: IFindAllStockDTO): Promise<Stock[]> {
    return this.ormRepository.filter(
      s => availability && s.availability === availability,
    );
  }

  public async findById(id: string): Promise<Stock | undefined> {
    const stock = this.ormRepository.find(s => s.id === id);
    return stock;
  }

  public async findByProduct(id: string): Promise<Stock | undefined> {
    const stock = this.ormRepository.find(s => s.product_id === id);
    return stock;
  }

  public async findAllByProductId(ids: string[]): Promise<Stock[]> {
    const stock: Stock[] = [];
    // eslint-disable-next-line array-callback-return
    ids.map(i => {
      const item = this.ormRepository.find(s => s.product_id === i);
      if (item) {
        stock.push(item);
      }
    });

    return stock;
  }
}
