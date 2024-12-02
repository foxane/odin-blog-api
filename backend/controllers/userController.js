import prisma from '../prisma/prismaClient.js';
import { errorResponse, successResponse } from '../utils/response.js';
import { createJWT } from './authController.js';

export const getAllUser = async (req, res, next) => {
  try {
    if (req.user.authValue < 3)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Forbidden, admin only',
      });

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, authValue: true },
    });

    successResponse(res, {
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        authValue: true,
      },
    });

    successResponse(res, {
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const getSelf = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        authValue: true,
        email: true,
      },
    });

    successResponse(res, {
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    if (userId !== req.user.id)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Not your account',
      });

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        email,
        password,
      },
    });

    successResponse(res, {
      message: 'User data updated',
      data: {
        token: createJWT({
          id: user.id,
          name: user.name,
          authValue: user.authValue,
        }),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const makeAuthor = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { secret } = req.body;

    if (secret !== 'stupid blog' || userId !== req.user.id)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Wrong secret code',
      });

    if (req.user.authValue >= 2)
      return errorResponse(res, {
        statusCode: 400,
        message: "You're already an author",
      });

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        authValue: 2,
      },
    });

    successResponse(res, {
      message: 'You are now author',
      data: {
        token: createJWT({
          id: user.id,
          name: user.name,
          authValue: user.authValue,
        }),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.authValue < 3)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Fucking forbidden',
      });

    await prisma.user.delete({
      where: { id: req.params.userId },
    });

    successResponse(res, {
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUserPost = async (req, res, next) => {
  try {
    if (req.params.userId !== req.user.id && req.user.authValue < 3)
      return errorResponse(res, {
        statusCode: 403,
        message: 'You need to be respective user or an admin to see this',
      });

    const posts = await prisma.post.findMany({
      where: { userId: req.params.userId },
      include: {
        categories: true,
        comments: {
          include: { User: true },
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

export const getPublishedUserPost = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.params.userId,
        published: true,
      },
    });

    successResponse(res, {
      data: { posts },
    });
  } catch (error) {
    next(error);
  }
};
