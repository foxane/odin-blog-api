import prisma from '../prisma/prismaClient.js';
import { getImageSrc } from '../utils/utils.js';

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        User: {
          select: { id: true, name: true },
        },
        categories: true,
      },
    });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  res.json(req.post);
};

export const createPost = async (req, res, next) => {
  const { title, content, categories } = req.body;
  if (req.user.authValue < 2)
    return res.status(403).json({ message: 'Forbidden' });

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image: getImageSrc(content),
        userId: req.user.id,
        categories: {
          connectOrCreate: categories.map(cat => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
      },
      include: { categories: true },
    });

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { title, content, categories } = req.body;
  const { post } = req;
  if (post.userId !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });

  try {
    const data = await prisma.post.update({
      where: { id: post.id },
      data: {
        title,
        content,
        image: getImageSrc(content),
        categories: {
          connectOrCreate: categories.map(cat => ({
            where: { name: cat },
            create: { name: cat },
          })),
          set: categories.map(cat => ({ name: cat })),
        },
      },
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    // Allow only the owner (author) or admin to delete the post
    if (req.post.userId !== req.user.id && req.user.authValue < 3)
      return res.status(403).json({ message: 'Forbidden' });

    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const publishPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { post } = req;
    const publishStatus = req.body.publish;
    if (post.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const postData = await prisma.post.update({
      where: { id: postId },
      data: {
        published: publishStatus,
        publishedAt: publishStatus ? new Date() : null,
      },
      include: { categories: true },
    });

    res.json(postData);
  } catch (error) {
    next(error);
  }
};

export const getCommentByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        content: true,
        User: { select: { id: true, name: true } },
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};
