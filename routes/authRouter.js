import { Router } from 'express';
import { regValidation, loginValidation } from '../middlewares/validator.js';
import { login, register } from '../controllers/authController.js';

const authRouter = Router();
authRouter.route('/register').post(regValidation, register);
authRouter.route('/login').post(loginValidation, login);

export default authRouter;
