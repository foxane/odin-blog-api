import prisma from '../prisma/prismaClient.js';
import { createJWT } from './authController.js';

export const getAllUser = async (req, res, next) => {
  try {
    if (req.user.authValue < 3)
      return res.status(403).json({ message: 'Forbidden' });

    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, authValue: true },
    });

    res.json(users);
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

    res.json(user);
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

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    if (userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        email,
        password,
      },
    });

    res.json(
      createJWT({
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const makeAuthor = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { secret } = req.body;

    if (secret !== 'stupid blog' || userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    if (req.user.authValue >= 2)
      res.status(400).json({ message: 'Already an author' });

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        authValue: 2,
      },
    });

    res.json(
      createJWT({
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.authValue < 3)
      return res.status(403).json({ message: 'Forbidden' });

    await prisma.user.delete({
      where: { id: req.params.userId },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getAllUserPost = async (req, res, next) => {
  try {
    if (req.params.userId !== req.user.id && req.user.authValue < 3)
      return res.status(403).json({ message: 'Forbidden' });

    const posts = await prisma.post.findMany({
      where: { userId: req.params.userId },
      include: {
        categories: true,
        comments: {
          include: { User: true },
        },
      },
    });

    res.json(posts);
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

    res.json(posts);
  } catch (error) {
    next(error);
  }
};
