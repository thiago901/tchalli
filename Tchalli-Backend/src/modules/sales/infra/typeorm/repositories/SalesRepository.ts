import { Repository, getRepository, Between } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';

export default class ProductRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async create({ amount, price, type }: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create({
      amount,
      price,
      type,
    });
    await this.ormRepository.save(sale);
    return sale;
  }

  public async save(sale: Sale): Promise<Sale> {
    await this.ormRepository.save(sale);
    const saleOne = await this.ormRepository.findOne({
      where: { id: sale.id },
    });

    return saleOne || sale;
  }

  public async findAll({ date }: IListSaleDTO): Promise<Sale[]> {
    return this.ormRepository.find({
      where: {
        created_at: Between(startOfDay(date), endOfDay(date)),
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['saleDetail'],
    });
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne({
      where: { id },
    });
    return sale;
  }
}
