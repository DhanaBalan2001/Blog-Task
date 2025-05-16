import Blog from '../models/Blog.js';
import User from '../models/User.js';


// Get a Single Blog By Id

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    res.json(blog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

// Get all blogs

export const getBlogs = async (req, res) => {
  try {
    const { category, author } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (author) {
      query.author = author;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new blog

export const createBlog = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;

    const user = await User.findById(req.user._id);

    const blog = await Blog.create({
      title,
      category,
      content,
      image,
      author: user.name,
      userId: req.user._id,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a blog

export const updateBlog = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author of the blog
    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a blog

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author of the blog
    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};