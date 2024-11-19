import prisma from '../prisma/prismaClient.js';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response.js';

export const createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    const post = await prisma.post.create({
      data: { userId, title, content },
    });

    successResponse(res, {
      statusCode: 201,
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const getContent = req.query.content === 'true' || false;

    const posts = await prisma.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        publishDate: true,
        category: true,
        content: getContent,
        user: {
          select: { fullName: true, id: true },
        },
      },
    });

    successResponse(res, {
      data: { posts },
    });
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: { id: true, fullName: true },
        },
      },
    });

    successResponse(res, {
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });

    successResponse(res, {
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

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
    const { publish } = req.body;

    if (publish !== 'true' && publish !== 'false') {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Not a boolean',
      });
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        published: publish === 'true',
        publishDate: publish === 'true' ? new Date() : null,
      },
    });

    successResponse(res, {
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      select: {
        id: true,
        content: true,
        createDate: true,
        user: {
          select: { id: true, fullName: true },
        },
      },
    });

    successResponse(res, {
      data: { comments },
    });
  } catch (error) {
    next(error);
  }
};
