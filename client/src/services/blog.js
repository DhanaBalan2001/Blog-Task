import api from './api';

const getAllBlogs = async (filters = {}) => {
  const { category, author } = filters;
  let url = '/blogs';
  
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (author) params.append('author', author);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const response = await api.get(url);
  return response.data;
};

const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

const createBlog = async (blogData) => {
  const response = await api.post('/blogs', blogData);
  return response.data;
};

const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/${id}`, blogData);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

const blogService = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;