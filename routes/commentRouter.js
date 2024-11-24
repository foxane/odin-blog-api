import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getAllComment,
  getSingleComment,
  updateComment,
} from '../controllers/commentController.js';
import {
  verifyCommentExist,
  verifyJWT,
} from '../middlewares/authMiddleware.js';
import { commentValidation } from '../middlewares/validator.js';

const commentRouter = Router();
commentRouter
  .route('/:commentId')
  .get(verifyCommentExist, getSingleComment)
  .put(verifyJWT, verifyCommentExist, updateComment)
  .delete(verifyJWT, verifyCommentExist, deleteComment);

commentRouter
  .route('/')
  .get(verifyJWT, getAllComment)
  .post(verifyJWT, commentValidation, createComment);

export default commentRouter;
