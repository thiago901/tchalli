import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';

export default interface IProductsRepository {
  create(data: ICreateProductsDTO): Promise<Product>;
  save(data: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
}
