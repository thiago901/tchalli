import { Repository, getRepository, In } from 'typeorm';
import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';
import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import ICreateStockDTO from '@modules/stock/dtos/ICreateStockDTO';
import IFindAllStockDTO from '@modules/stock/dtos/IFindAllStockDTO';

export default class StockRepository implements IStockRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async create({
    amount,
    price,
    product_id,
    availability,
  }: ICreateStockDTO): Promise<Stock> {
    const stock = this.ormRepository.create({
      amount,
      price,
      product_id,
      availability,
    });
    await this.ormRepository.save(stock);
    return stock;
  }

  public async save(stock: Stock): Promise<Stock> {
    await this.ormRepository.save(stock);
    const sto = await this.ormRepository.findOne({
      where: { id: stock.id },
    });

    return sto || stock;
  }

  public async findAll({ availability }: IFindAllStockDTO): Promise<Stock[]> {
    return this.ormRepository.find({
      where: { availability },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findById(id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne({
      where: { id },
    });
    return stock;
  }

  public async findByProduct(id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne({
      where: { product_id: id },
      relations: ['product'],
    });

    return stock;
  }

  public async findAllByProductId(ids: string[]): Promise<Stock[]> {
    const stock = await this.ormRepository.find({ product_id: In(ids) });

    return stock;
  }
}
