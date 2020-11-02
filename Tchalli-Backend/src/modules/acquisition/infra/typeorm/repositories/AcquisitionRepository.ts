import { Repository, getRepository, Between } from 'typeorm';
import IAcquisitionRepository from '@modules/acquisition/infra/repositories/IAcquisitionRepository';
import Acquistion from '@modules/acquisition/infra/typeorm/entities/Acquistion';
import ICreateAcquisitionDTO from '@modules/acquisition/dtos/ICreateAcquisitionDTO';
import { endOfDay, startOfDay } from 'date-fns';
import IFindAllAcquisitionDTO from '@modules/acquisition/dtos/IFindAllAcquisitionDTO';

export default class AcquisitonRepository implements IAcquisitionRepository {
  private ormRepository: Repository<Acquistion>;

  constructor() {
    this.ormRepository = getRepository(Acquistion);
  }

  public async create({
    amount,
    cost_price,
    product_id,
  }: ICreateAcquisitionDTO): Promise<Acquistion> {
    const acquisition = this.ormRepository.create({
      amount,
      cost_price,
      product_id,
    });
    await this.ormRepository.save(acquisition);
    return acquisition;
  }

  public async save(acquisition: Acquistion): Promise<Acquistion> {
    await this.ormRepository.save(acquisition);
    const acquis = await this.ormRepository.findOne({
      where: { id: acquisition.id },
    });

    return acquis || acquisition;
  }

  public async findAll({
    date,
  }: IFindAllAcquisitionDTO): Promise<Acquistion[]> {
    return this.ormRepository.find({
      where: {
        created_at: Between(startOfDay(date), endOfDay(date)),
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findById(id: string): Promise<Acquistion | undefined> {
    const acquisition = await this.ormRepository.findOne({
      where: { id },
    });
    return acquisition;
  }
}
