import Acquistion from '@modules/acquisition/infra/typeorm/entities/Acquistion';
import ICreateAcquisitionDTO from '@modules/acquisition/dtos/ICreateAcquisitionDTO';
import IFindAllAcquisitionDTO from '@modules/acquisition/dtos/IFindAllAcquisitionDTO';

export default interface IAcquisitionRepository {
  create(data: ICreateAcquisitionDTO): Promise<Acquistion>;
  save(data: Acquistion): Promise<Acquistion>;
  findAll({ date }: IFindAllAcquisitionDTO): Promise<Acquistion[]>;
  findById(id: string): Promise<Acquistion | undefined>;
}
