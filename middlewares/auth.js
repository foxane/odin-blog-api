import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';
import { errorResponse } from '../utils/response.js';

export const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return errorResponse(res, {
      statusCode: 401,
      message: 'Authentication failed',
      errorDetails: {
        messageToDeveloper:
          'You need to add jwt token to authorization header with bearer schema',
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error instanceof jwt.TokenExpiredError
        ? 'Session expired, please login again'
        : 'Authentication failed';

    errorResponse(res, {
      statusCode: 401,
      message,
      errorDetails: error,
    });
  }
};

export const verifyUserUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return errorResponse(res, {
      statusCode: 403,
      message: 'You are not owner of this account',
    });
  }
  next();
};

export const verifyUserExist = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
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

export const verifyAdmin = async (req, res, next) => {
  if (req.user.role !== 'ADMIN')
    return errorResponse(res, {
      statusCode: 403,
      message: 'You need to be an admin to do this',
    });
  next();
};

// Populate req.post with post object to reduce db query
export const verifyPostExist = async (req, res, next) => {
  const { postId } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post)
    return errorResponse(res, {
      statusCode: 404,
      message: 'Post not found',
    });

  req.post = post;
  next();
};

// Show unpublished post if user is the owner
export const getPostDetailsWrapper = () => {
  return (req, res, next) => {
    if (!req.post.published) {
      return [verifyJWT, verifyPostOwner].reduce((chain, middleware) => {
        return (req, res, next) =>
          chain(req, res, err => {
            if (err) return next(err);
            middleware(req, res, next);
          });
      })(req, res, next);
    } else {
      next();
    }
  };
};

export const verifyPostPublished = (req, res, next) => {
  if (!req.post.published) {
    return errorResponse(res, {
      statusCode: 404,
      message: 'Post not found',
    });
  }

  next();
};

export const verifyPostOwner = (req, res, next) => {
  if (req.post.userId !== req.user.id)
    return errorResponse(res, {
      statusCode: 403,
      message: 'You are not owner of this post',
    });

  next();
};

// Populate req.comment
export const verifyCommentExist = async (req, res, next) => {
  const comment = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
    select: {
      id: true,
      content: true,
      createDate: true,
      user: {
        select: { id: true, fullName: true },
      },
    },
  });

  if (!comment) {
    return errorResponse(res, {
      statusCode: 404,
      message: 'Comment not found',
    });
  }

  req.comment = comment;
  next();
};

export const verifyCommentOwner = (req, res, next) => {
  if (!req.comment.user.id === req.user.id) {
    return errorResponse(res, {
      statusCode: 403,
      message: 'Unauthorized',
    });
  }

  next();
};
