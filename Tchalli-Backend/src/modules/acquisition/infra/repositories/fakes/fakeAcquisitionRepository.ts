import { v4 } from 'uuid';
import IAcquisitionRepository from '@modules/acquisition/infra/repositories/IAcquisitionRepository';
import Acquistion from '@modules/acquisition/infra/typeorm/entities/Acquistion';
import ICreateAcquisitionDTO from '@modules/acquisition/dtos/ICreateAcquisitionDTO';
import IFindAllAcquisitionDTO from '@modules/acquisition/dtos/IFindAllAcquisitionDTO';

export default class fakeProductRepository implements IAcquisitionRepository {
  private ormRepository: Acquistion[] = [];

  public async create({
    amount,
    cost_price,
    product_id,
  }: ICreateAcquisitionDTO): Promise<Acquistion> {
    const acquisition = new Acquistion();
    Object.assign(acquisition, {
      id: v4(),
      amount,
      cost_price,
      product_id,
    });
    this.ormRepository.push(acquisition);
    return acquisition;
  }

  public async save(acquisition: Acquistion): Promise<Acquistion> {
    const acquisitionIndex = this.ormRepository.findIndex(
      acqui => acqui.id === acquisition.id,
    );
    this.ormRepository[acquisitionIndex] = acquisition;
    return acquisition;
  }

  public async findAll({
    date,
  }: IFindAllAcquisitionDTO): Promise<Acquistion[]> {
    return this.ormRepository.filter(
      s => s.created_at >= date && s.created_at <= date,
    );
  }

  public async findById(id: string): Promise<Acquistion | undefined> {
    const product = this.ormRepository.find(a => a.id === id);
    return product;
  }
}
