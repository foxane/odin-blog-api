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
};

export const verifyPostExist = async (req, res, next) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post)
    return errorResponse(res, {
      statusCode: 404,
      message: 'Post not found',
    });

  req.post = post;
  next();
};
