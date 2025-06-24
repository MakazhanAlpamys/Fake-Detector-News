import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();
  const { texts } = useLanguage() || {};
  
  // Default text values if translations aren't loaded yet
  const defaultTexts = {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    loggingIn: 'Logging in...',
    noAccount: 'Don\'t have an account?',
    registerHere: 'Register here',
    adminLoginHint: 'Use admin@example.com / Admin123! to login as administrator',
    errorInvalidCredentials: 'Invalid email or password',
    forgotPassword: 'Forgot password?'
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(texts?.errorInvalidCredentials || defaultTexts.errorInvalidCredentials);
    } finally {
      setLoading(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <div className={`flex justify-center items-center min-h-[calc(100vh-12rem)] py-10 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    } transition-colors duration-300`}>
      <motion.div 
        className="w-full max-w-md px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={`rounded-lg shadow-xl px-8 pt-6 pb-8 mb-4 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {texts?.login || defaultTexts.login}
          </h2>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {/* Admin login hint */}
          <div className={`mb-4 text-xs italic text-center ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
          }`}>
            <Tooltip text={texts?.adminLoginHint || defaultTexts.adminLoginHint}>
              <span className="cursor-help border-b border-dotted">
                {texts?.adminLoginHint || defaultTexts.adminLoginHint}
              </span>
            </Tooltip>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block text-sm font-bold mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`} htmlFor="email">
                {texts?.email || defaultTexts.email}
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                id="email"
                type="email"
                placeholder={texts?.enterEmail || defaultTexts.enterEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-bold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`} htmlFor="password">
                  {texts?.password || defaultTexts.password}
                </label>
                <Link 
                  to="/forgot-password" 
                  className={`text-xs hover:underline ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`}
                >
                  {texts?.forgotPassword || defaultTexts.forgotPassword}
                </Link>
              </div>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                id="password"
                type="password"
                placeholder={texts?.enterPassword || defaultTexts.enterPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <motion.button
                className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (texts?.loggingIn || defaultTexts.loggingIn) : (texts?.login || defaultTexts.login)}
              </motion.button>
            </div>
          </form>
        </div>
        
        <div className="text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {texts?.noAccount || defaultTexts.noAccount} <Link to="/register" className="text-blue-500 hover:text-blue-700">{texts?.registerHere || defaultTexts.registerHere}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 