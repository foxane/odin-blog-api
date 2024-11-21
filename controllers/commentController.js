import { successResponse, errorResponse } from '../utils/response.js';
import prisma from '../prisma/prismaClient.js';

export const getCommentByPost = async (req, res, next) => {
  const where = {};
  if (req.query.postId) where.postId = req.query.postId;

  const comments = await prisma.comment.findMany({
    where,
  });

  successResponse(res, {
    data: { comments },
  });
};

export const getSingleComment = async (req, res, next) => {
  successResponse(res, {
    data: { comment: req.comment },
  });
};

export const createComment = async (req, res, next) => {
  if (!req.query.postId)
    return errorResponse(res, {
      statusCode: 400,
      message: 'Set postId in url query parameter',
    });

  await prisma.comment.create({
    data: {
      content: req.body.content,
      userId: req.user.id,
      postId: req.query.postId,
    },
  });

  successResponse(res, {
    statusCode: 201,
    message: 'Comment created',
  });
};

export const updateComment = async (req, res, next) => {
  if (req.comment.userId !== req.user.id)
    return errorResponse(res, {
      statusCode: 403,
      message: 'Not your comment',
    });

  await prisma.comment.update({
    where: { id: req.params.commentId },
    data: { content: req.body.content },
  });

  successResponse(res, {
    statusCode: 204,
  });
};

export const deleteComment = async (req, res, next) => {
  // Allow only the owner or admin to delete the comment
  if (req.comment.userId !== req.user.id && req.user.authValue < 3)
    return errorResponse(res, {
      statusCode: 403,
      message: 'Unauthorized',
    });

  await prisma.comment.delete({ where: { id: req.params.commentId } });

  successResponse(res, {
    statusCode: 204,
  });
};
