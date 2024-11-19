import { Router } from 'express';
import { loginValidator, signupValidator } from '../middlewares/validator.js';
import { login, register } from '../controllers/authController.js';

const authRouter = Router();

authRouter.route('/login').post(loginValidator, login);
authRouter.route('/register').post(signupValidator, register);

export default authRouter;
