import { Router } from 'express';
import {
  deleteUser,
  getAllUser,
  getAllUserPost,
  getPublishedUserPost,
  getSelf,
  getSingleUser,
  makeAuthor,
  updateUser,
} from '../controllers/userController.js';
import { verifyJWT, verifyUserExist } from '../middlewares/authMiddleware.js';

const userRouter = Router();
userRouter.route('/me').get(verifyJWT, getSelf);
userRouter.route('/:userId/posts/all').get(verifyJWT, getAllUserPost);
userRouter.route('/:userId/posts').get(getPublishedUserPost);
userRouter
  .route('/:userId')
  .get(verifyUserExist, getSingleUser)
  .put(verifyJWT, verifyUserExist, updateUser)
  .patch(verifyJWT, verifyUserExist, makeAuthor)
  .delete(verifyJWT, verifyUserExist, deleteUser);
userRouter.route('/').get(verifyJWT, getAllUser);

export default userRouter;
