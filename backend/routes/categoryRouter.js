import { Router } from 'express';
import { categoryValidation } from '../middlewares/validator.js';
import {
  createCategory,
  deleteCategory,
  deleteUnusedCat,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from '../controllers/categoryController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const categoryRouter = Router();
categoryRouter
  .route('/:categoryId')
  .get(getSingleCategory)
  .put(verifyJWT, categoryValidation, updateCategory)
  .delete(verifyJWT, deleteCategory);
categoryRouter
  .route('/')
  .get(getAllCategory)
  .post(verifyJWT, categoryValidation, createCategory)
  .delete(verifyJWT, deleteUnusedCat);

export default categoryRouter;
