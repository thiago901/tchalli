import Stock from '@modules/stock/infra/typeorm/entities/Stock';
import ICreateStockDTO from '@modules/stock/dtos/ICreateStockDTO';
import IFindAllStockDTO from '@modules/stock/dtos/IFindAllStockDTO';

export default interface IAcquisitionRepository {
  create(data: ICreateStockDTO): Promise<Stock>;
  save(data: Stock): Promise<Stock>;
  findAll(data: IFindAllStockDTO): Promise<Stock[]>;
  findById(id: string): Promise<Stock | undefined>;
  findByProduct(id: string): Promise<Stock | undefined>;
  findAllByProductId(id: string[]): Promise<Stock[]>;
}
