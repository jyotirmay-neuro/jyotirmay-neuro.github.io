import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Journey from './pages/Journey';
import BlogPost from './pages/BlogPost';
import CategoryBlog from './pages/CategoryBlog';
import CV from './pages/CV';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:category" element={<CategoryBlog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;