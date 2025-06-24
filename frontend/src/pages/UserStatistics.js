import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const UserStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Default text values if translations aren't loaded
  const defaultTexts = {
    userStatistics: 'User Statistics',
    backToAdminPanel: 'Back to Admin Panel',
    loadingStatistics: 'Loading statistics...',
    generalStatistics: 'General Statistics',
    totalUsers: 'Total Users',
    registeredAccounts: 'Registered accounts',
    totalChecks: 'Total Checks',
    newsChecksPerformed: 'News checks performed',
    fakeNewsPercentage: 'Fake News Percentage',
    realNewsPercentage: 'Real News Percentage',
    avgFakeNewsDetected: 'Average percentage of news detected as fake',
    avgRealNewsDetected: 'Average percentage of news detected as real',
    topActiveUsers: 'Top 5 Active Users',
    noDataAvailableYet: 'No data available yet',
    checksPerformed: 'checks performed',
    userContribution: 'Each user\'s contribution to the total news checks'
  };
  
  // Animation refs
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        damping: 15 
      }
    }
  };
  
  const countVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 80 
      }
    }
  };
  
  const chartVariants = {
    hidden: { width: 0 },
    visible: width => ({
      width: `${width}%`,
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      }
    })
  };
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get('http://localhost:5000/api/news/statistics');
        setStatistics(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatistics();
  }, []);
  
  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    } py-10`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto px-4 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          } mb-4 md:mb-0`}>
            {texts.userStatistics || defaultTexts.userStatistics}
          </h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/admin" 
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800 text-blue-400 border-gray-700'
                  : 'bg-white text-blue-600 border-blue-200'
              } px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center border`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {texts.backToAdminPanel || defaultTexts.backToAdminPanel}
            </Link>
          </motion.div>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className={`${
              theme === 'dark'
                ? 'bg-red-900/30 border-red-700 text-red-300'
                : 'bg-red-100 border-red-500 text-red-700'
            } border-l-4 p-4 rounded-lg mb-6`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-red-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {texts.loadingStatistics || defaultTexts.loadingStatistics}
              </p>
            </div>
          </motion.div>
        ) : statistics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              ref={ref1}
              variants={containerVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-xl overflow-hidden`}
            >
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-700">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  {texts.generalStatistics || defaultTexts.generalStatistics}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className={`${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-800' 
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
                  } p-6 rounded-xl shadow-sm text-center border`}>
                    <motion.div variants={countVariants} className={`text-4xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                      {statistics.userCount}
                    </motion.div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="font-medium">{texts.totalUsers || defaultTexts.totalUsers}</div>
                      <div className="text-xs mt-1">{texts.registeredAccounts || defaultTexts.registeredAccounts}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className={`${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-800' 
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
                  } p-6 rounded-xl shadow-sm text-center border`}>
                    <motion.div variants={countVariants} className={`text-4xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mb-2`}>
                      {statistics.checkCount}
                    </motion.div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="font-medium">{texts.totalChecks || defaultTexts.totalChecks}</div>
                      <div className="text-xs mt-1">{texts.newsChecksPerformed || defaultTexts.newsChecksPerformed}</div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.fakeNewsPercentage || defaultTexts.fakeNewsPercentage}
                    </div>
                    <div className={`text-sm font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                      {statistics.avgFakePercentage}%
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className={`overflow-hidden h-3 mb-4 text-xs flex rounded-full ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                      <motion.div 
                        custom={statistics.avgFakePercentage}
                        variants={chartVariants}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} italic`}>
                    {texts.avgFakeNewsDetected || defaultTexts.avgFakeNewsDetected}
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {texts.realNewsPercentage || defaultTexts.realNewsPercentage}
                    </div>
                    <div className={`text-sm font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      {100 - statistics.avgFakePercentage}%
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className={`overflow-hidden h-3 mb-4 text-xs flex rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <motion.div 
                        custom={100 - statistics.avgFakePercentage}
                        variants={chartVariants}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} italic`}>
                    {texts.avgRealNewsDetected || defaultTexts.avgRealNewsDetected}
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              ref={ref2}
              variants={containerVariants}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-xl overflow-hidden`}
            >
              <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 border-b border-green-700">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {texts.topActiveUsers || defaultTexts.topActiveUsers}
                </h3>
              </div>
              <div className="p-6">
                {statistics.topUsers.length === 0 ? (
                  <motion.div 
                    variants={itemVariants}
                    className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <svg className={`w-16 h-16 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{texts.noDataAvailableYet || defaultTexts.noDataAvailableYet}</p>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    {statistics.topUsers.map((user, index) => {
                      const percentage = ((user.check_count / statistics.checkCount) * 100).toFixed(1);
                      return (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-3 rounded-lg transition-colors duration-150`}
                        >
                          <div className="flex items-center mb-2">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${
                              index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                              index === 1 ? 'bg-gray-100 text-gray-700' : 
                              index === 2 ? 'bg-orange-100 text-orange-700' : 
                              'bg-blue-100 text-blue-700'
                            }`}>
                              <span className="font-bold text-sm">{index + 1}</span>
                            </div>
                            <div className="flex-grow">
                              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                {user.nickname}
                              </div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.check_count} {texts.checksPerformed || defaultTexts.checksPerformed}
                              </div>
                            </div>
                            <div className="w-16 text-right">
                              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                {percentage}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-12">
                            <div className={`overflow-hidden h-2 text-xs flex rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                              <motion.div 
                                custom={parseFloat(percentage)}
                                variants={chartVariants}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 rounded-full"
                              ></motion.div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                <motion.div 
                  variants={itemVariants}
                  className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} text-center`}
                >
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {texts.userContribution || defaultTexts.userContribution}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default UserStatistics; 