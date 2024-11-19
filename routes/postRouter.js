import { Router } from 'express';
import * as postCtrl from '../controllers/postController.js';
import * as auth from '../middlewares/auth.js';
import { postValidator } from '../middlewares/validator.js';

const postRouter = Router();

postRouter
  .route('/:postId/comments')
  .get(
    auth.verifyPostExist,
    auth.verifyPostPublished,
    postCtrl.getCommentsByPost,
  );
postRouter
  .route('/:postId/publish')
  .patch(
    auth.verifyJWT,
    auth.verifyPostExist,
    auth.verifyPostOwner,
    postCtrl.publishPost,
  );
postRouter
  .route('/:postId')
  .get(
    auth.verifyPostExist,
    auth.getPostDetailsWrapper(),
    postCtrl.getSinglePost,
  )
  .put(
    auth.verifyJWT,
    auth.verifyPostExist,
    postValidator,
    auth.verifyPostOwner,
    postCtrl.updatePost,
  )
  .delete(
    auth.verifyJWT,
    auth.verifyPostExist,
    auth.verifyPostOwner,
    postCtrl.deletePost,
  );
postRouter
  .route('/')
  .get(postCtrl.getAllPosts)
  .post(auth.verifyJWT, postValidator, postCtrl.createPost);

export default postRouter;
