import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Default text values if translations aren't loaded yet
  const defaultTexts = {
    historyTitle: 'Your News Check History',
    historyDescription: 'Review all your previous news verification results and their credibility scores',
    loadingHistory: 'Loading your history...',
    noHistoryTitle: 'You haven\'t checked any news yet',
    noHistoryDescription: 'Start by analyzing news on the Check News page',
    checkNewsNow: 'Check News Now',
    historyInfoText: 'Click on any row to expand the news content. Your history is private and only visible to you.',
    date: 'Date',
    result: 'Result'
  };
  
  // Animation refs
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: width => ({
      width: `${width}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  };
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get('http://localhost:5000/api/news/history');
        setHistory(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const toggleRowExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className={`flex flex-col items-center min-h-screen py-10 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    } transition-colors duration-300`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl px-4 mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
          {texts.historyTitle || defaultTexts.historyTitle}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {texts.historyDescription || defaultTexts.historyDescription}
        </p>
      </motion.div>
      
      <div className="w-full max-w-6xl px-4" ref={ref}>
        {error && (
          <motion.div 
            className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-16"
            >
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">
                  {texts.loadingHistory || defaultTexts.loadingHistory}
                </p>
              </div>
            </motion.div>
          ) : history.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                {texts.noHistoryTitle || defaultTexts.noHistoryTitle}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {texts.noHistoryDescription || defaultTexts.noHistoryDescription}
              </p>
              
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/check-news" 
                  className="inline-block py-2 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                  {texts.checkNewsNow || defaultTexts.checkNewsNow}
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="table"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {texts.date || defaultTexts.date}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {texts.newsTitle || 'News'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {texts.result || defaultTexts.result}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {texts.confidenceScore || 'Confidence'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {history.map((item) => (
                      <motion.tr 
                        key={item.id} 
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                        variants={itemVariants}
                        onClick={() => toggleRowExpand(item.id)}
                      >
                        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-300">{formatDate(item.checked_at)}</td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-800 dark:text-white">{item.title}</div>
                          <AnimatePresence>
                            {expandedRows[item.id] ? (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm text-gray-600 dark:text-gray-300 mt-2"
                              >
                                {item.description}
                              </motion.div>
                            ) : (
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">
                                {item.description.length > 100 
                                  ? `${item.description.substring(0, 100)}...` 
                                  : item.description}
                              </div>
                            )}
                          </AnimatePresence>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.result 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {item.result 
                              ? (texts.real || 'REAL') 
                              : (texts.fake || 'FAKE')}
                          </span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <motion.div 
                                className={`h-2.5 rounded-full ${item.result ? 'bg-green-500' : 'bg-red-500'}`}
                                custom={item.confidence_percentage}
                                variants={progressVariants}
                                initial="hidden"
                                animate="visible"
                              ></motion.div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.confidence_percentage}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-6xl px-4 mt-8"
      >
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 p-4 rounded-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                {texts.historyInfoText || defaultTexts.historyInfoText}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default History; 