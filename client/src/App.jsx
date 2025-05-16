import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import BlogList from './components/blogs/BlogList';
import BlogDetail from './components/blogs/BlogDetail';
import CreateBlog from './components/blogs/CreateBlog';
import EditBlog from './components/blogs/EditBlog';
import MyBlogs from './components/blogs/MyBlogs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to="/blogs" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/blogs" 
                element={
                  <PrivateRoute>
                    <BlogList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/blogs/:id" 
                element={
                  <PrivateRoute>
                    <BlogDetail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/my-blogs" 
                element={
                  <PrivateRoute>
                    <MyBlogs />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/create-blog" 
                element={
                  <PrivateRoute>
                    <CreateBlog />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/edit-blog/:id" 
                element={
                  <PrivateRoute>
                    <EditBlog />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/blogs" />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;