import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListStockService from '@modules/stock/services/ListStockService';
import UpdatePriceStockService from '@modules/stock/services/UpdatePriceStockService';
import CreateStockService from '@modules/stock/services/CreateStockService';
import ShowStockService from '@modules/stock/services/ShowStockService';

class StockControllers {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { amount, price, availability, product_id } = req.body;

    const createStockService = container.resolve(CreateStockService);
    const stocks = await createStockService.execute({
      amount,
      price,
      availability,
      product_id,
    });
    return resp.json(stocks);
  }

  public async index(req: Request, resp: Response): Promise<Response> {
    const availability = req.query.availability as string;

    const listStockService = container.resolve(ListStockService);
    const stocks = await listStockService.execute({
      availability: availability ? availability === 'true' : true,
    });
    return resp.json(stocks);
  }

  public async show(req: Request, resp: Response): Promise<Response> {
    const { id } = req.params;
    const showStockService = container.resolve(ShowStockService);
    const stocks = await showStockService.execute({ id });
    return resp.json(stocks);
  }

  public async update(req: Request, resp: Response): Promise<Response> {
    const { product_id } = req.params;
    const { price } = req.body;

    const updatePriceStockService = container.resolve(UpdatePriceStockService);
    const stock = await updatePriceStockService.execute({
      price,
      product_id,
    });
    return resp.json(stock);
  }
}
export default StockControllers;
