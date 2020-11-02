import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProviderService from '@modules/users/services/UpdateProviderService';

export default class UsersController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { user_id_target } = req.params;
    const updateProviderService = container.resolve(UpdateProviderService);
    const user_update = await updateProviderService.execute({
      user_id: id,
      user_id_target,
    });
    return res.json(classToClass(user_update));
  }
}
