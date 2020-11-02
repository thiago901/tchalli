import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserSevice';
import ListUserSevice from '@modules/users/services/ListUserSevice';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, provider } = req.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      name,
      email,
      password,
      provider,
    });
    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listUserSevice = container.resolve(ListUserSevice);
    const users = await listUserSevice.execute({ execept_id_user: id });

    return res.json(classToClass(users));
  }
}
