import { Router } from 'express';
import * as auth from '../middlewares/auth.js';
import * as commentCtrl from '../controllers/commentController.js';
import { commentValidator } from '../middlewares/validator.js';

const commentRouter = Router();
commentRouter
  .route('/:commentId')
  .get(auth.verifyCommentExist, commentCtrl.getSingleComment)
  .put(
    commentValidator,
    auth.verifyJWT,
    auth.verifyCommentExist,
    auth.verifyCommentOwner,
    commentCtrl.updateComment,
  )
  .delete(
    auth.verifyJWT,
    auth.verifyCommentExist,
    auth.verifyCommentOwner,
    commentCtrl.deleteComment,
  );

commentRouter
  .route('/')
  .get(commentCtrl.getAllComment)
  .post(auth.verifyJWT, commentValidator, commentCtrl.createComment);

export default commentRouter;
