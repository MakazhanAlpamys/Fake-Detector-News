import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Значения по умолчанию, если переводы не загружены
  const defaultTexts = {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    loggingIn: 'Logging in...',
    noAccount: 'Don\'t have an account?',
    registerHere: 'Register here',
    showPassword: 'Show password',
    hidePassword: 'Hide password'
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className={`flex justify-center py-8 px-4 min-h-screen ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="w-full max-w-md">
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700 shadow-lg text-white' 
            : 'bg-white border border-gray-200 shadow-lg text-gray-800'
        } rounded-lg px-8 pt-6 pb-8 mb-6`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {texts.login || defaultTexts.login}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`} htmlFor="email">
                {texts.email || defaultTexts.email}
              </label>
              <input
                className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                }`}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`} htmlFor="password">
                {texts.password || defaultTexts.password}
              </label>
              <div className="relative">
                <input
                  className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                  }`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={togglePasswordVisibility}
                  title={showPassword ? (texts.hidePassword || defaultTexts.hidePassword) : (texts.showPassword || defaultTexts.showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className={`${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 border border-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600 border border-blue-600'
                } text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-full shadow-md hover:shadow-lg`}
                type="submit"
                disabled={loading}
              >
                {loading ? (texts.loggingIn || defaultTexts.loggingIn) : (texts.login || defaultTexts.login)}
              </button>
            </div>
          </form>
        </div>
        
        <div className={`text-center ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <p className="text-sm">
            {texts.noAccount || defaultTexts.noAccount} <Link to="/register" className={`${
              theme === 'dark' 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            } font-medium`}>{texts.registerHere || defaultTexts.registerHere}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 