import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'],
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
