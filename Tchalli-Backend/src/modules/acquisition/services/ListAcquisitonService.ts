import { inject, injectable } from 'tsyringe';

import Acquistion from '@modules/acquisition/infra/typeorm/entities/Acquistion';
import IAcquistionsRepository from '@modules/acquisition/infra/repositories/IAcquisitionRepository';

interface IRequest {
  date: Date;
}
@injectable()
class CreateAcquistionService {
  constructor(
    @inject('AcquisitionRepository')
    private acquistionsRepository: IAcquistionsRepository,
  ) {}

  public async execute({ date }: IRequest): Promise<Acquistion[]> {
    const Acquistions = await this.acquistionsRepository.findAll({
      date,
    });
    return Acquistions;
  }
}

export default CreateAcquistionService;
