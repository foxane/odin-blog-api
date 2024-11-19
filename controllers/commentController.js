import prisma from '../prisma/prismaClient.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllComment = async (req, res, next) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: { select: { id: true, fullName: true } },
    },
  });
  successResponse(res, {
    data: { comments },
  });
};

export const getSingleComment = async (req, res, next) => {
  const { comment } = req;
  successResponse(res, {
    data: { comment },
  });
};

export const createComment = async (req, res, next) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Post id query should be set',
        errorDetails: {
          messageToDev: 'Set the query parameter to ?postId=<actualId>',
        },
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId, published: true },
    });
    if (!post) {
      return errorResponse(res, {
        statusCode: 404,
        message: 'Post not found',
      });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: req.user.id,
        content: req.body.content,
      },
    });

    successResponse(res, {
      message: 'Comment created',
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await prisma.comment.update({
      where: { id: req.params.commentId },
      data: {
        content: req.body.content,
      },
    });

    successResponse(res, {
      message: 'Comment Edited',
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await prisma.comment.delete({
      where: { id: req.params.commentId },
    });

    successResponse(res, {
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};
