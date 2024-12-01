import prisma from '../prisma/prismaClient.js';
import { errorResponse, successResponse } from '../utils/response.js';

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        User: {
          select: { id: true, name: true },
        },
        categories: true,
      },
    });

    successResponse(res, {
      data: { posts },
    });
  } catch (error) {
    next(error);
  }
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

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: req.user.id,
        categories: {
          connectOrCreate: categories.map(cat => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
      },
      include: { categories: true },
    });

    successResponse(res, {
      statusCode: 200,
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { title, content, categories } = req.body;
  const { post } = req;
  if (post.userId !== req.user.id)
    return errorResponse(res, {
      statusCode: 403,
      message: 'You are not author of this post',
    });

  try {
    await prisma.post.update({
      where: { id: post.id },
      data: {
        title,
        content,
        categories: {
          connectOrCreate: categories.map(cat => ({
            where: { name: cat },
            create: { name: cat },
          })),
          set: categories.map(cat => ({ name: cat })),
        },
      },
    });

    successResponse(res, {
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const publishPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { post } = req;
    const publishStatus = req.body.publish;
    if (post.userId !== req.user.id)
      return errorResponse(res, {
        statusCode: 403,
        message: 'You are not author of this post',
      });

    const postData = await prisma.post.update({
      where: { id: postId },
      data: {
        published: publishStatus,
        publishedAt: publishStatus ? new Date() : null,
      },
      include: { categories: true },
    });

    successResponse(res, {
      statusCode: 200,
      data: { post: postData },
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      select: {
        createdAt: true,
        content: true,
        User: { select: { id: true, name: true } },
      },
    });

    successResponse(res, {
      data: { comments },
    });
  } catch (error) {
    next(error);
  }
};
