import prisma from '../prisma/prismaClient.js';
import { errorResponse, successResponse } from '../utils/response.js';

export const getAllPost = async (req, res, next) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
  });

  successResponse(res, {
    data: { posts },
  });
};

export const getSinglePost = async (req, res, next) => [
  successResponse(res, {
    data: { post: req.post },
  }),
];

export const createPost = async (req, res, next) => {
  const { title, content, categories } = req.body;
  if (req.user.authValue < 2)
    return errorResponse(res, {
      statusCode: 403,
      message: 'You are not Author',
    });

  await prisma.post.create({
    data: { title, content, categories, userId: req.user.id },
  });

  successResponse(res, {
    statusCode: 201,
  });
};

export const updatePost = async (req, res, next) => {
  const { title, content, categories } = req.body;
  const { post } = req;
  console.log(post.userId === req.user.id);
  if (post.userId !== req.user.id)
    return errorResponse(res, {
      statusCode: 403,
      message: 'You are not author of this post',
    });

  await prisma.post.update({
    where: { id: post.id },
    data: {
      title,
      content,
      categories,
    },
  });

  successResponse(res, {
    statusCode: 204,
  });
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  // Allow only the owner (author) or admin to delete the post
  if (req.post.userId !== req.user.id && req.user.authValue < 3) {
    return errorResponse(res, {
      statusCode: 403,
      message: 'Unauthorized',
    });
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  successResponse(res, {
    statusCode: 204,
  });
};

export const publishPost = async (req, res, next) => {
  const { postId } = req.params;
  const { post } = req;
  const publishStatus = req.body.publish === 'true' || false;
  if (post.userId !== req.user.id)
    return errorResponse(res, {
      statusCode: 403,
      message: 'You are not author of this post',
    });

  await prisma.post.update({
    where: { id: postId },
    data: {
      published: publishStatus,
      publishedAt: publishStatus ? new Date() : null,
    },
  });

  successResponse(res, {
    statusCode: 204,
  });
};
