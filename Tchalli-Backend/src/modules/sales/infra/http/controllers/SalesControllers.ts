import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSaleService from '@modules/sales/services/CreateSaleService';
import ListSaleService from '@modules/sales/services/ListSaleService';
import ShowSaleService from '@modules/sales/services/ShowSaleService';

class SalesControllers {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { type, amount, price } = req.body;
    const createSaleService = container.resolve(CreateSaleService);
    const sale = await createSaleService.execute({
      type,
      amount,
      price,
    });
    return resp.json(sale);
  }

  public async index(req: Request, resp: Response): Promise<Response> {
    const date = req.query.date as string;

    const listSaleService = container.resolve(ListSaleService);
    const sale = await listSaleService.execute({
      date: new Date(date),
    });
    return resp.json(sale);
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const showSaleService = container.resolve(ShowSaleService);
    const sale = await showSaleService.execute({
      id,
    });
    return resp.json(sale);
  }
}
export default SalesControllers;
