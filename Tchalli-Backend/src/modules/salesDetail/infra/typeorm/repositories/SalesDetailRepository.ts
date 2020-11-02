import { Repository, getRepository, Between } from 'typeorm';
import ISalesDetailRepository from '@modules/salesDetail/infra/repositories/ISalesDetailRepository';
import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';
import ICreateSaleDetailDTO from '@modules/salesDetail/dtos/ICreateSaleDetailDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';
import { endOfDay, startOfDay } from 'date-fns';

export default class SaleDetailRepository implements ISalesDetailRepository {
  private ormRepository: Repository<SaleDetail>;

  constructor() {
    this.ormRepository = getRepository(SaleDetail);
  }

  public async create({
    amount,
    price,
    sale_id,
    product_id,
  }: ICreateSaleDetailDTO): Promise<SaleDetail> {
    const sale = this.ormRepository.create({
      amount,
      price,
      sale_id,
      product_id,
    });
    await this.ormRepository.save(sale);
    return sale;
  }

  public async createMany(
    salesDetail: ICreateSaleDetailDTO[],
  ): Promise<SaleDetail[]> {
    const sales = this.ormRepository.create(salesDetail);
    await this.ormRepository.save(sales);
    return sales;
  }

  public async save(sale: SaleDetail): Promise<SaleDetail> {
    await this.ormRepository.save(sale);
    const saleOne = await this.ormRepository.findOne({
      where: { id: sale.id },
    });

    return saleOne || sale;
  }

  public async findAll({ date }: IListSaleDTO): Promise<SaleDetail[]> {
    return this.ormRepository.find({
      where: {
        created_at: Between(startOfDay(date), endOfDay(date)),
      },
      relations: ['product'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findById(id: string): Promise<SaleDetail | undefined> {
    const sale = await this.ormRepository.findOne({
      where: { id },
    });
    return sale;
  }

  public async findBySaleId(id: string): Promise<SaleDetail[]> {
    const sale = await this.ormRepository.find({
      where: { sale_id: id },
      relations: ['product'],
    });
    return sale;
  }
}
