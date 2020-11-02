import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowStockProductService from '@modules/stock/services/ShowStockProductService';

class StockControllers {
  public async show(req: Request, resp: Response): Promise<Response> {
    const { product_id } = req.params;
    const showStockProductService = container.resolve(ShowStockProductService);
    const stocks = await showStockProductService.execute({ id: product_id });
    return resp.json(stocks);
  }
}
export default StockControllers;
