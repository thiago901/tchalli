import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IAcquisitionRepository from '../infra/repositories/IAcquisitionRepository';
import Acquistion from '../infra/typeorm/entities/Acquistion';

interface IRequest {
  id: string;
}
@injectable()
class ShowAcquisitonService {
  constructor(
    @inject('AcquisitionRepository')
    private AcquistionsRepository: IAcquisitionRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Acquistion> {
    const Acquistions = await this.AcquistionsRepository.findById(id);
    if (!Acquistions) {
      throw new AppError('Acquistion not found');
    }
    return Acquistions;
  }
}

export default ShowAcquisitonService;
