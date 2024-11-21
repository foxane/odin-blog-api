import prisma from '../prisma/prismaClient.js';
import { errorResponse, successResponse } from '../utils/response.js';
import { createJWT } from './authController.js';

export const getAllUser = async (req, res, next) => {
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
};

export const getSingleUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      authValue: true,
      posts: { where: { published: true } },
    },
  });

  successResponse(res, {
    data: { user },
  });
};

export const updateUser = async (req, res, next) => {
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
};

export const makeAuthor = async (req, res, next) => {
  const { userId } = req.params;
  const { secret } = req.body;

  if (secret !== 'stupid blog' || userId !== req.user.id)
    return errorResponse(res, {
      statusCode: 403,
      message: 'Wrong secret code',
    });

  if (req.user.authValue > 2)
    return errorResponse(res, {
      statusCode: 400,
      message: "You're already an author",
    });

  const user = await prisma.user.update({
    where: { id: userId },
    message: 'User data updated',
    data: {
      token: createJWT({
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      }),
    },
  });

  successResponse(res, {
    message: 'You are now author',
    data: {
      token: createJWT(),
    },
  });
};

export const deleteUser = async (req, res, next) => {
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
};
