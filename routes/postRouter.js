import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getSinglePost,
  publishPost,
  updatePost,
} from '../controllers/postController.js';
import { postValidation } from '../middlewares/validator.js';
import { verifyJWT, verifyPostExist } from '../middlewares/authMiddleware.js';

const postRouter = Router();
postRouter
  .route('/:postId')
  .get(verifyPostExist, getSinglePost)
  .put(verifyJWT, postValidation, verifyPostExist, updatePost)
  .patch(verifyJWT, verifyPostExist, publishPost)
  .delete(verifyJWT, verifyPostExist, deletePost);

postRouter
  .route('/')
  .get(getAllPost)
  .post(postValidation, verifyJWT, createPost);

export default postRouter;
