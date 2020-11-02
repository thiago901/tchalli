import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokesRepository';

import IProductsRepository from '@modules/products/infra/repositories/IProductsRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

import IAcquisitionRepository from '@modules/acquisition/infra/repositories/IAcquisitionRepository';
import AcquisitionRepository from '@modules/acquisition/infra/typeorm/repositories/AcquisitionRepository';

import IStockRepository from '@modules/stock/infra/repositories/IStockRepository';
import StockRepository from '@modules/stock/infra/typeorm/repositories/StockRepository';

import ISalesRepository from '@modules/sales/infra/repositories/ISalesRepository';
import SalesRepository from '@modules/sales/infra/typeorm/repositories/SalesRepository';

import ISalesDetailRepository from '@modules/salesDetail/infra/repositories/ISalesDetailRepository';
import SalesDetailRepository from '@modules/salesDetail/infra/typeorm/repositories/SalesDetailRepository';

import CreateStockService from '@modules/stock/services/CreateStockService';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductRepository,
);
container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository,
);
container.registerSingleton<IAcquisitionRepository>(
  'AcquisitionRepository',
  AcquisitionRepository,
);
container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository,
);
container.registerSingleton<ISalesDetailRepository>(
  'SalesDetailRepository',
  SalesDetailRepository,
);

container.registerSingleton<CreateStockService>(
  'CreateStockService',
  CreateStockService,
);
