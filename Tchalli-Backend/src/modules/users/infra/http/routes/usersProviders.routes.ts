import { Router } from 'express';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';

import UsersProvidersController from '../controllers/UsersProviderController';

const usersProvidersController = new UsersProvidersController();
const userProviderRoutes = Router();

userProviderRoutes.use(ensureAuthenticad);

userProviderRoutes.put('/:user_id_target', usersProvidersController.update);

export default userProviderRoutes;
