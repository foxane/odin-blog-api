import prisma from '../prisma/prismaClient.js';

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory = (req, res, next) => {
  try {
    res.json(req.category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    if (req.user.authValue < 2)
      return res.status(403).json({ message: 'Forbidden' });

    const { name } = req.body;
    const data = await prisma.category.create({ data: { name } });

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    if (req.user.authValue < 2)
      return res.status(403).json({ message: 'Forbidden' });

    const { name } = req.body;
    await prisma.category.update({
      where: { id: req.params.categoryId },
      data: { name },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    if (req.user.authValue < 2)
      return res.status(403).json({ message: 'Forbidden' });

    await prisma.category.delete({ where: { id: req.params.categoryId } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const deleteUnusedCat = async (req, res, next) => {
  try {
    if (req.user.authValue < 3)
      return res.status(403).json({ message: 'Forbidden' });

    await prisma.category.deleteMany({ where: { posts: { none: {} } } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
