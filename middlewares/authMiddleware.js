import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from '../utils/response.js';
import prisma from '../prisma/prismaClient.js';

export const verifyJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token)
    return errorResponse(res, {
      statusCode: 401,
      message: 'JWT is not provided',
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const msg =
      error instanceof jwt.TokenExpiredError
        ? 'Session ended, please log in again'
        : 'Authentication failed';

    errorResponse(res, {
      statusCode: 401,
      message: msg,
    });
  }
};

export const verifyUserExist = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return errorResponse(res, {
        statusCode: 404,
        message: 'User not found',
      });

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyPostExist = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post)
      return errorResponse(res, {
        statusCode: 404,
        message: 'Post not found',
      });

    req.post = post;
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyCommentExist = async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: req.params.commentId },
    });
    if (!comment)
      return errorResponse(res, {
        statusCode: 404,
        message: 'Comment not found',
      });

    req.comment = comment;
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyCategoryExist = async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.categoryId },
    });
    if (!category)
      return errorResponse(res, {
        statusCode: 404,
        message: 'Category not found',
      });

    res.category = category;
    next();
  } catch (error) {
    next(error);
  }
};
