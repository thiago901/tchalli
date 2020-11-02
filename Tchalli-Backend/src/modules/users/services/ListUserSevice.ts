import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';

interface IRequest {
  execept_id_user?: string;
}
@injectable()
class ListUserSevice {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ execept_id_user }: IRequest): Promise<User[]> {
    return this.userRepository.findAll(execept_id_user);
  }
}
export default ListUserSevice;
