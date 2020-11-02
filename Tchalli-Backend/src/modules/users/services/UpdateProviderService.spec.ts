import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import AppError from '@shared/errors/AppError';

import UpdateProviderService from './UpdateProviderService';

let fakeUserRepository: FakeUserRepository;
let updateProviderService: UpdateProviderService;

describe('UpdateProviderUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    updateProviderService = new UpdateProviderService(fakeUserRepository);
  });
  it('should be able to update the provider user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      provider: true,
    });
    const user_target = await fakeUserRepository.create({
      name: 'John Trée',
      email: 'johntree@gmail.com',
      password: '123456',
      provider: false,
    });

    const userUpdate = await updateProviderService.execute({
      user_id: user.id,
      user_id_target: user_target.id,
    });

    expect(userUpdate.provider).toBe(true);
  });
  it('should not be able to update the provider user with id wrong', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      provider: true,
    });
    const user_target = await fakeUserRepository.create({
      name: 'John Trée',
      email: 'johntree@gmail.com',
      password: '123456',
      provider: false,
    });

    await expect(
      updateProviderService.execute({
        user_id: 'non-exists',
        user_id_target: user_target.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the provider user target non-exist', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      provider: true,
    });
    await fakeUserRepository.create({
      name: 'John Trée',
      email: 'johntree@gmail.com',
      password: '123456',
      provider: false,
    });

    await expect(
      updateProviderService.execute({
        user_id: user.id,
        user_id_target: 'non-exists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the provider user target if user request not provider', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      provider: false,
    });

    const user_target = await fakeUserRepository.create({
      name: 'John Trée',
      email: 'johntree@gmail.com',
      password: '123456',
      provider: false,
    });

    await expect(
      updateProviderService.execute({
        user_id: user.id,
        user_id_target: user_target.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
