import { Router } from 'express';
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  makeAuthor,
  updateUser,
} from '../controllers/userController.js';
import { verifyJWT, verifyUserExist } from '../middlewares/authMiddleware.js';

const userRouter = Router();
userRouter.route('/').get(verifyJWT, getAllUser);
userRouter
  .route('/:userId')
  .get(verifyUserExist, getSingleUser)
  .put(verifyJWT, verifyUserExist, updateUser)
  .patch(verifyJWT, verifyUserExist, makeAuthor)
  .delete(verifyJWT, verifyUserExist, deleteUser);

export default userRouter;
