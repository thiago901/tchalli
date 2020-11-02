import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSaleService from '@modules/salesDetail/services/ListSaleDetailService';
import CreateSaleDetailService from '@modules/salesDetail/services/CreateSaleDetailService';
import ShowSaleDetailService from '@modules/salesDetail/services/ShowSaleDetailService';

class SalesDetailControllers {
  public async index(req: Request, resp: Response): Promise<Response> {
    const date = req.query.date as string;

    const listSaleService = container.resolve(ListSaleService);
    const sale = await listSaleService.execute({
      date: new Date(date),
    });
    return resp.json(sale);
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { saleDetail } = req.body;

    const createSaleDetailService = container.resolve(CreateSaleDetailService);
    const sales = await createSaleDetailService.execute(saleDetail);
    return resp.json(sales);
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;

    const showSaleDetailService = container.resolve(ShowSaleDetailService);
    const sale = await showSaleDetailService.execute({ id });
    return resp.json(sale);
  }
}
export default SalesDetailControllers;
