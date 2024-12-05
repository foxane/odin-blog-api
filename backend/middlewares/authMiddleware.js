import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const verifyJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).json({ message: 'Forbidden' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const msg =
      error instanceof jwt.TokenExpiredError
        ? 'Session ended, please log in again'
        : 'Authentication failed';

    res.status(401).json({ message: msg });
  }
};

export const verifyUserExist = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json('Resource not found');

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyPostExist = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) return res.status(404).json('Resource not found');

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

    if (!comment) return res.status(404).json('Resource not found');

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

    if (!category) return res.status(404).json('Resource not found');

    res.category = category;
    next();
  } catch (error) {
    next(error);
  }
};
