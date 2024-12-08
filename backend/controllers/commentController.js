import prisma from '../prisma/prismaClient.js';

export const getAllComment = async (req, res, next) => {
  if (req.user.authValue < 3)
    return res.status(403).json({ message: 'Forbidden' });

  try {
    const comments = await prisma.comment.findMany({
      select: {
        id: true,
        createdAt: true,
        content: true,
        User: { select: { id: true, name: true } },
        Post: { select: { id: true, title: true } },
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const getSingleComment = async (req, res, next) => {
  res.json(req.comment);
};

export const createComment = async (req, res, next) => {
  try {
    if (!req.query.postId)
      return res
        .status(400)
        .json({ message: 'Set postId in url query parameter' });

    const data = await prisma.comment.create({
      data: {
        content: req.body.content,
        userId: req.user.id,
        postId: req.query.postId,
      },
    });

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    if (req.comment.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const data = await prisma.comment.update({
      where: { id: req.params.commentId },
      data: { content: req.body.content },
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    // Allow only the owner or admin to delete the comment
    if (req.comment.userId !== req.user.id && req.user.authValue < 3)
      return res.status(403).json({ message: 'Forbidden' });

    await prisma.comment.delete({ where: { id: req.params.commentId } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
