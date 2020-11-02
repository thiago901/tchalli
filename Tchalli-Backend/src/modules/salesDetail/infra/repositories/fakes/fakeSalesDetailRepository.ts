import { v4 } from 'uuid';
import ISalesDetailRepository from '@modules/salesDetail/infra/repositories/ISalesDetailRepository';
import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';
import ICreateSaleDetailDTO from '@modules/salesDetail/dtos/ICreateSaleDetailDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';

export default class fakeSaleRepository implements ISalesDetailRepository {
  private ormRepository: SaleDetail[] = [];

  public async create({
    amount,
    price,
    product_id,
    sale_id,
  }: ICreateSaleDetailDTO): Promise<SaleDetail> {
    const sale = new SaleDetail();
    Object.assign(sale, {
      id: v4(),
      amount,
      price,
      product_id,
      sale_id,
    });
    this.ormRepository.push(sale);
    return sale;
  }

  public async createMany(
    salesDetail: ICreateSaleDetailDTO[],
  ): Promise<SaleDetail[]> {
    const sales: SaleDetail[] = [];

    salesDetail.map(async s => {
      const sale = new SaleDetail();
      Object.assign(sale, {
        id: v4(),
        amount: s.amount,
        price: s.price,
        product_id: s.product_id,
        sale_id: s.sale_id,
      });
      this.ormRepository.push(sale);
      sales.push(sale);
    });

    return sales;
  }

  public async save(sale: SaleDetail): Promise<SaleDetail> {
    const saleIndex = this.ormRepository.findIndex(s => s.id === sale.id);
    this.ormRepository[saleIndex] = sale;
    return sale;
  }

  public async findAll({ date }: IListSaleDTO): Promise<SaleDetail[]> {
    return this.ormRepository.filter(
      s => s.created_at >= date && s.created_at <= date,
    );
  }

  public async findById(id: string): Promise<SaleDetail | undefined> {
    const product = this.ormRepository.find(p => p.id === id);
    return product;
  }

  public async findBySaleId(id: string): Promise<SaleDetail[]> {
    const product = this.ormRepository.filter(p => p.sale_id === id);
    return product;
  }
}
