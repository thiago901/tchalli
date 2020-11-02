import { Router } from 'express';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();
const userRoutes = Router();

userRoutes.post('/', usersController.create);

userRoutes.use(ensureAuthenticad);

userRoutes.get('/', usersController.index);

export default userRoutes;
