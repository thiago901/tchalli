import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAcquisitonService from '@modules/acquisition/services/CreateAcquisitonService';
import ListAcquisitonService from '@modules/acquisition/services/ListAcquisitonService';
import ShowAcquisitonService from '@modules/acquisition/services/ShowAcquisitonService';

class AcquisitionControllers {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { amount, cost_price, product_id } = req.body;
    const createAcquisitionService = container.resolve(CreateAcquisitonService);
    const acquisition = await createAcquisitionService.execute({
      amount,
      cost_price,
      product_id,
    });
    return resp.json(acquisition);
  }

  public async index(req: Request, resp: Response): Promise<Response> {
    const date = req.query.date as string;

    const listAcquisitonService = container.resolve(ListAcquisitonService);
    const acquisition = await listAcquisitonService.execute({
      date: new Date(date),
    });
    return resp.json(acquisition);
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const showAcquisitonService = container.resolve(ShowAcquisitonService);
    const acquisition = await showAcquisitonService.execute({ id });
    return resp.json(acquisition);
  }
}
export default AcquisitionControllers;
