import SaleDetail from '@modules/salesDetail/infra/typeorm/entities/SaleDetail';
import ICreateSaleDetailDTO from '@modules/salesDetail/dtos/ICreateSaleDetailDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';

export default interface ISalesDetailRepository {
  create(data: ICreateSaleDetailDTO): Promise<SaleDetail>;
  createMany(data: ICreateSaleDetailDTO[]): Promise<SaleDetail[]>;
  save(data: SaleDetail): Promise<SaleDetail>;
  findAll(data: IListSaleDTO): Promise<SaleDetail[]>;
  findById(id: string): Promise<SaleDetail | undefined>;
  findBySaleId(sale_id: string): Promise<SaleDetail[]>;
}
