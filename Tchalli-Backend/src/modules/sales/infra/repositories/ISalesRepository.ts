import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';

export default interface ISalesRepository {
  create(data: ICreateSaleDTO): Promise<Sale>;
  save(data: Sale): Promise<Sale>;
  findAll(data: IListSaleDTO): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;
}
