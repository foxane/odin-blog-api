import { Router } from 'express';
import * as postCtrl from '../controllers/postController.js';
import {
  getPostDetailsWrapper,
  verifyJWT,
  verifyPostExist,
  verifyPostOwner,
  verifyPostPublished,
  verifyCommentExist,
  verifyCommentOwner,
} from '../middlewares/auth.js';
import { postValidator } from '../middlewares/validator.js';

const postRouter = Router();
postRouter
  .route('/:postId/comments/:commentId')
  .get(verifyCommentExist, postCtrl.getSingleComment)
  .put(
    verifyJWT,
    verifyPostExist,
    verifyCommentExist,
    verifyCommentOwner,
    postCtrl.updateComment,
  )
  .delete(
    verifyJWT,
    verifyPostExist,
    verifyCommentExist,
    verifyCommentOwner,
    postCtrl.deleteComment,
  );
postRouter
  .route('/:postId/comments')
  .get(verifyPostExist, verifyPostPublished, postCtrl.getCommentsByPost)
  .post(verifyJWT, verifyPostExist, postCtrl.createComment);
postRouter
  .route('/:postId/publish')
  .patch(verifyJWT, verifyPostExist, verifyPostOwner, postCtrl.publishPost);
postRouter
  .route('/:postId')
  .get(verifyPostExist, getPostDetailsWrapper(), postCtrl.getSinglePost)
  .put(
    verifyJWT,
    verifyPostExist,
    postValidator,
    verifyPostOwner,
    postCtrl.updatePost,
  )
  .delete(verifyJWT, verifyPostExist, verifyPostOwner, postCtrl.deletePost);
postRouter
  .route('/')
  .get(postCtrl.getAllPosts)
  .post(verifyJWT, postValidator, postCtrl.createPost);

export default postRouter;
