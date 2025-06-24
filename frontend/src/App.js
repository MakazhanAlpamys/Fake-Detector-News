import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CheckNews from './pages/CheckNews';
import History from './pages/History';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import UserStatistics from './pages/UserStatistics';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-6 mt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Protected Routes */}
                  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                  <Route path="/check-news" element={<PrivateRoute element={<CheckNews />} />} />
                  <Route path="/history" element={<PrivateRoute element={<History />} />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminRoute element={<AdminPanel />} />} />
                  <Route path="/admin/statistics" element={<AdminRoute element={<UserStatistics />} />} />
                </Routes>
              </main>
              <Footer />
    </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
