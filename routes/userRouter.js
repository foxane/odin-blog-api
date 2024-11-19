import { Router } from 'express';
import { signupValidator } from '../middlewares/validator.js';
import * as auth from '../middlewares/auth.js';
import * as user from '../controllers/userController.js';

const userRouter = Router();

// Users routes
userRouter
  .route('/:userId/posts')
  .get(auth.verifyUserExist, user.getPostsByUser);
userRouter
  .route('/:userId/comments')
  .get(auth.verifyUserExist, user.getCommentsByUser);
userRouter
  .route('/:userId')
  .get(auth.verifyUserExist, user.getUserDetails)
  .put(auth.verifyJWT, auth.verifyUserUpdate, signupValidator, user.updateUser)
  .delete(
    auth.verifyJWT,
    auth.verifyUserExist,
    auth.verifyAdmin,
    user.deleteUser,
  )
  .patch(
    auth.verifyJWT,
    auth.verifyUserExist,
    auth.verifyAdmin,
    user.changeRole,
  );
userRouter.route('/').get(user.getAllUsers);

export default userRouter;
