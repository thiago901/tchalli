import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  user_id_target: string;
}

@injectable()
class UpdateProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, user_id_target }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    // Verify if already exist the user
    if (!user) {
      throw new AppError('User not found');
    }

    if (!user.provider) {
      throw new AppError('User should be provider');
    }

    const user_target = await this.userRepository.findById(user_id_target);

    if (!user_target) {
      throw new AppError('User target not found');
    }
    user_target.provider = !user_target.provider;
    await this.userRepository.save(user_target);

    return user_target;
  }
}
export default UpdateProviderService;
