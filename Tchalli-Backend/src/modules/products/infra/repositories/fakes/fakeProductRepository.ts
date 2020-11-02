import { v4 } from 'uuid';
import IProductsRepository from '@modules/products/infra/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';

export default class fakeProductRepository implements IProductsRepository {
  private ormRepository: Product[] = [];

  public async create({
    name,
    color,
    description,
    size,
  }: ICreateProductsDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, {
      id: v4(),
      name,
      color,
      description,
      size,
    });
    this.ormRepository.push(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    const productIndex = this.ormRepository.findIndex(
      prod => prod.id === product.id,
    );
    this.ormRepository[productIndex] = product;
    return product;
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.find(p => p.id === id);
    return product;
  }
}
