import { Request, Response } from 'express';

import { container } from 'tsyringe';
import SendForgotPasswordEmail from '@modules/users/services/SendForgotPasswordEmail';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);
    await sendForgotPasswordEmail.execute({
      email,
    });
    return response.status(204).json();
  }
}
