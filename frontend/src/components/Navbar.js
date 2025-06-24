import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, texts = {} } = useLanguage() || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLangMenuOpen) setIsLangMenuOpen(false);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Animation variants
  const navbarVariants = {
    initial: {
      backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0)' : 'rgba(37, 99, 235, 0)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
    },
    scrolled: {
      backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(37, 99, 235, 0.95)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: i * 0.1, duration: 0.3 } 
    }),
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const langButtonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  // Language options
  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' }
  ];

  // Default menu item names in case translations aren't loaded yet
  const defaultMenuItems = {
    home: 'Home',
    contact: 'Contact',
    checkNews: 'Check News',
    history: 'History',
    profile: 'Profile',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout'
  };

  const menuItems = [
    { name: texts.home || defaultMenuItems.home, path: '/', showAlways: true },
    { name: texts.contact || defaultMenuItems.contact, path: '/contact', showAlways: true },
    { name: texts.checkNews || defaultMenuItems.checkNews, path: '/check-news', showLoggedIn: true },
    { name: texts.history || defaultMenuItems.history, path: '/history', showLoggedIn: true },
    { name: texts.profile || defaultMenuItems.profile, path: '/profile', showLoggedIn: true },
    { name: texts.admin || defaultMenuItems.admin, path: '/admin', showAdmin: true }
  ];

  // Filter menu items based on auth state
  const filteredMenuItems = menuItems.filter(item => 
    (item.showAlways) || 
    (currentUser && item.showLoggedIn) || 
    (currentUser?.role === 'admin' && item.showAdmin)
  );

  // Добавление defaultTexts для навигационной панели
  const defaultTexts = {
    appName: 'Fake News Detector',
    home: 'Home',
    checkNews: 'Check News',
    admin: 'Admin',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard'
  };

  // Улучшение стилей для активных и неактивных кнопок
  const activeClass = theme === 'dark'
    ? 'bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md border border-blue-500'
    : 'bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md border border-blue-400';
    
  const inactiveClass = theme === 'dark'
    ? 'bg-gray-700 text-white font-medium py-2 px-4 rounded-lg border border-gray-600 hover:bg-gray-600'
    : 'bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-300';

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      } ${theme === 'dark' ? 'dark:bg-gray-900' : ''}`}
      initial="initial"
      animate={scrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className={`flex items-center ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-blue-50 text-blue-600'
                } rounded-lg p-2`}
              >
                <div className={`mr-2 rounded-full flex items-center justify-center h-8 w-8 ${
                  theme === 'dark' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-bold text-lg tracking-tight">{texts.appName || defaultTexts.appName}</span>
              </Link>
            </div>
          </motion.div>
          
          {/* Mobile menu buttons */}
          <div className="flex items-center md:hidden">
            {/* Language selector for mobile */}
            <div className="relative mr-3">
              <Tooltip text={texts?.tooltipLang || 'Change language'}>
                <motion.button
                  onClick={toggleLangMenu}
                  className={`
                    px-3 py-1.5 rounded-md flex items-center space-x-1 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600' 
                      : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
                  `}
                  aria-label="Change language"
                >
                  <span className="text-lg">{languageOptions.find(l => l.code === language)?.flag}</span>
                  <span className="font-medium">{languageOptions.find(l => l.code === language)?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </motion.button>
              </Tooltip>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50"
                  >
                    {languageOptions.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                          language === lang.code 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                            : 'text-gray-700 dark:text-gray-300'
                        } hover:bg-blue-50 dark:hover:bg-gray-700`}
                        whileHover={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#eff6ff' }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme toggle button for mobile */}
            <Tooltip text={texts?.tooltipTheme || 'Toggle theme'}>
              <motion.button
                onClick={toggleTheme}
                className={`
                  p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${theme === 'dark' 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 border border-gray-600' 
                    : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
                  }
                  transition-colors
                `}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                )}
              </motion.button>
            </Tooltip>
            
            <motion.button 
              className="z-50 relative"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-7 h-7 flex flex-col justify-center items-center">
                <motion.span 
                  className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'absolute rotate-45' : '-translate-y-1.5'}`}
                />
                <motion.span 
                  className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <motion.span 
                  className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'absolute -rotate-45' : 'translate-y-1.5'}`}
                />
              </div>
            </motion.button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {filteredMenuItems.map((item, index) => (
              <Tooltip key={item.path} text={item.name || ''}>
                <motion.div
                  custom={index}
                  initial="closed"
                  animate="open"
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={item.path} 
                    className={location.pathname === item.path ? activeClass : inactiveClass}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              </Tooltip>
            ))}
            
            {/* Language selector for desktop */}
            <div className="relative ml-2">
              <Tooltip text={texts?.tooltipLang || 'Change language'}>
                <motion.button
                  onClick={toggleLangMenu}
                  className={`
                    px-3 py-2 rounded-lg flex items-center space-x-1 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300'
                    }
                    focus:outline-none transition-colors
                  `}
                  aria-label="Change language"
                >
                  <span className="text-lg mr-1">{languageOptions.find(l => l.code === language)?.flag}</span>
                  <span className="font-medium">{language.toUpperCase()}</span>
                </motion.button>
              </Tooltip>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50"
                  >
                    {languageOptions.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                          language === lang.code 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                            : 'text-gray-700 dark:text-gray-300'
                        } hover:bg-blue-50 dark:hover:bg-gray-700`}
                        whileHover={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#eff6ff' }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme toggle button */}
            <Tooltip text={texts?.tooltipTheme || 'Toggle theme'}>
              <motion.button
                onClick={toggleTheme}
                className={`
                  p-2.5 rounded-lg focus:outline-none ml-1
                  ${theme === 'dark' 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 border border-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                  }
                  transition-colors
                `}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                )}
              </motion.button>
            </Tooltip>
            
            {currentUser ? (
              <motion.div
                initial="closed"
                animate="open"
                variants={menuItemVariants}
                custom={filteredMenuItems.length}
                className="ml-1"
              >
                <Tooltip text={texts?.tooltipLogout || 'Log out'}>
                  <motion.button 
                    onClick={logout}
                    className={`
                      py-2 px-4 rounded-lg text-center font-medium
                      ${theme === 'dark'
                        ? 'bg-red-600 hover:bg-red-700 text-white border border-red-700'
                        : 'bg-red-500 hover:bg-red-600 text-white border border-red-400'
                      }
                      focus:outline-none transition-colors
                    `}
                    variants={menuItemVariants}
                    custom={filteredMenuItems.length}
                  >
                    {texts.logout || defaultTexts.logout}
                  </motion.button>
                </Tooltip>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2 ml-1">
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={menuItemVariants}
                  custom={filteredMenuItems.length}
                >
                  <Tooltip text={texts?.tooltipLogin || 'Login'}>
                    <Link 
                      to="/login"
                      className={`py-2 px-4 rounded-lg font-medium ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-200 text-blue-600 border border-gray-300 hover:bg-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {texts.login || defaultTexts.login}
                    </Link>
                  </Tooltip>
                </motion.div>
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={menuItemVariants}
                  custom={filteredMenuItems.length + 1}
                >
                  <Tooltip text={texts?.tooltipRegister || 'Register'}>
                    <Link 
                      to="/register"
                      className={`py-2 px-4 rounded-lg font-medium ${
                        theme === 'dark'
                          ? 'bg-blue-600 text-white border border-blue-700 hover:bg-blue-700'
                          : 'bg-blue-500 text-white border border-blue-400 hover:bg-blue-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {texts.register || defaultTexts.register}
                    </Link>
                  </Tooltip>
                </motion.div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={`md:hidden mt-3 rounded-lg p-4 overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gray-800' 
                  : 'bg-blue-100 border border-blue-200'
              }`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="space-y-2">
                {filteredMenuItems.map((item, index) => (
                  <Tooltip key={item.path} text={item.name || ''}>
                    <motion.div
                      custom={index}
                      variants={menuItemVariants}
                    >
                      <Link 
                        to={item.path} 
                        className={location.pathname === item.path ? activeClass : inactiveClass}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </Tooltip>
                ))}
                
                {currentUser ? (
                  <motion.div
                    variants={menuItemVariants}
                    custom={filteredMenuItems.length}
                  >
                    <Tooltip text={texts?.tooltipLogout || 'Log out'}>
                      <button 
                        onClick={logout}
                        className={`
                          w-full mt-2 py-2 px-4 rounded-lg text-center font-medium
                          ${theme === 'dark'
                            ? 'bg-red-600 text-white hover:bg-red-700 border border-red-700'
                            : 'bg-red-500 text-white hover:bg-red-600 border border-red-400'
                          }
                          focus:outline-none transition-colors
                        `}
                      >
                        {texts.logout || defaultTexts.logout}
                      </button>
                    </Tooltip>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      variants={menuItemVariants}
                      custom={filteredMenuItems.length}
                    >
                      <Tooltip text={texts?.tooltipLogin || 'Login'}>
                        <Link 
                          to="/login"
                          className={`block w-full mt-2 py-2 px-4 rounded-lg text-center font-medium ${
                            theme === 'dark'
                              ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600'
                              : 'bg-gray-200 text-blue-600 border border-gray-300 hover:bg-gray-300'
                          }`}
                        >
                          {texts.login || defaultTexts.login}
                        </Link>
                      </Tooltip>
                    </motion.div>
                    <motion.div
                      variants={menuItemVariants}
                      custom={filteredMenuItems.length + 1}
                    >
                      <Tooltip text={texts?.tooltipRegister || 'Register'}>
                        <Link 
                          to="/register"
                          className={`block w-full mt-2 py-2 px-4 rounded-lg text-center font-medium ${
                            theme === 'dark'
                              ? 'bg-blue-600 text-white border border-blue-700 hover:bg-blue-700'
                              : 'bg-blue-500 text-white border border-blue-400 hover:bg-blue-600'
                          }`}
                        >
                          {texts.register || defaultTexts.register}
                        </Link>
                      </Tooltip>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 