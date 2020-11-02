import { Repository, getRepository } from 'typeorm';
import IProductsRepository from '@modules/products/infra/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';

export default class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    description,
    size,
    color,
  }: ICreateProductsDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      size,
      color,
    });
    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    const prod = await this.ormRepository.findOne({
      where: { id: product.id },
    });

    return prod || product;
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['stock'],
    });
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
      relations: ['stock'],
    });
    return product;
  }
}
