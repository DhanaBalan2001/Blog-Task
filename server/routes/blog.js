import { Router } from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blog.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.route('/')
  .get(protect, getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(protect, getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;