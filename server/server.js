import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';
import docRoutes from './routes/doc.js';

// Load env vars
config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [ 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

// Serve API documentation at root URL
app.get('/', (req, res) => {
    res.redirect('/api/docs');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/', docRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});