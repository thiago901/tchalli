import { Repository, getRepository, Not } from 'typeorm';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders(except_id_user: string): Promise<User[]> {
    let users: User[];
    if (except_id_user) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_id_user),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
    provider,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      provider,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }

  public async findAll(execept_id_user?: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(execept_id_user),
      },
    });
    return users;
  }
}
