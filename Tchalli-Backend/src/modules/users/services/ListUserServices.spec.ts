import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
// import AppError from '@shared/errors/AppError';
import ListUserSevice from './ListUserSevice';

let fakeUserRepository: FakeUserRepository;
let listUserSevice: ListUserSevice;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listUserSevice = new ListUserSevice(fakeUserRepository);
  });
  it('should be able to List all users', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Treê',
      email: 'johntreê@gmail.com',
      password: '123456',
    });
    const users = await listUserSevice.execute({});

    expect(users).toEqual(
      expect.arrayContaining([
        {
          id: user1.id,
          email: 'johndoe@gmail.com',
          name: 'John Doe',
          password: '123456',
        },
        {
          id: user2.id,
          email: 'johntreê@gmail.com',
          name: 'John Treê',
          password: '123456',
        },
      ]),
    );
  });
});
