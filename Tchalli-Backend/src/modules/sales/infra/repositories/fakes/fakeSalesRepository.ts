import { v4 } from 'uuid';
import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';

export default class fakeSaleRepository implements ISalesRepository {
  private ormRepository: Sale[] = [];

  public async create({ amount, type, price }: ICreateSaleDTO): Promise<Sale> {
    const sale = new Sale();
    Object.assign(sale, {
      id: v4(),
      amount,
      type,
      price,
    });
    this.ormRepository.push(sale);
    return sale;
  }

  public async save(sale: Sale): Promise<Sale> {
    const saleIndex = this.ormRepository.findIndex(s => s.id === sale.id);
    this.ormRepository[saleIndex] = sale;
    return sale;
  }

  public async findAll({ date }: IListSaleDTO): Promise<Sale[]> {
    return this.ormRepository.filter(
      s => s.created_at >= date && s.created_at <= date,
    );
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const product = this.ormRepository.find(p => p.id === id);
    return product;
  }
}
