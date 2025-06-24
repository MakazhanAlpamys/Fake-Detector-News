import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import checkAnimation from '../assets/check-animation.json';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const CheckNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Default text values if translations aren't loaded yet
  const defaultTexts = {
    detectFakeNews: 'Detect Fake News',
    submitNewsPrompt: 'Submit news content to analyze its credibility using our advanced AI technology',
    checkNewsTitle: 'Check News',
    newsTitle: 'News Title',
    newsDescription: 'News Description',
    enterNewsTitle: 'Enter the title of the news article',
    enterNewsDescription: 'Enter the content or description of the news article',
    analyzeNews: 'Analyze News',
    analyzing: 'Analyzing...',
    analysisResult: 'Analysis Result',
    real: 'REAL',
    fake: 'FAKE',
    confidenceScore: 'Confidence Score',
    analyzedNews: 'Analyzed News',
    detailedAnalysis: 'Detailed Analysis',
    aiInfoText: 'Our AI uses advanced natural language processing to analyze news content. While highly accurate, we recommend using this tool as one of many resources for verifying information.'
  };
  
  // Animation refs and state
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };
  
  const inputVariants = {
    focus: { 
      scale: 1.02, 
      boxShadow: theme === 'dark' 
        ? "0px 5px 20px rgba(0,0,0,0.5)" 
        : "0px 5px 20px rgba(0,0,0,0.15)"
    },
    blur: { 
      scale: 1, 
      boxShadow: "0px 0px 0px rgba(0,0,0,0.1)"
    }
  };
  
  const resultVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 100 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.3 
      } 
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: theme === 'dark'
        ? "0px 5px 15px rgba(29, 78, 216, 0.6)"
        : "0px 5px 15px rgba(37, 99, 235, 0.4)"
    },
    tap: { 
      scale: 0.95 
    },
    disabled: {
      opacity: 0.7,
      cursor: "not-allowed"
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: width => ({
      width: `${width}%`,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    })
  };

  // Staggered container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setResult(null);
      setLoading(true);
      
      const response = await axios.post('http://localhost:5000/api/news/check', {
        title,
        description
      });
      
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check news');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`flex flex-col items-center py-10 min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    } transition-colors duration-300`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mb-8 text-center"
      >
        <motion.h1 
          className={`text-3xl md:text-4xl font-bold text-center mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          {texts.detectFakeNews || defaultTexts.detectFakeNews}
        </motion.h1>
        <motion.p 
          className={`text-lg text-center max-w-2xl mx-auto mb-8 ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {texts.submitNewsPrompt || defaultTexts.submitNewsPrompt}
        </motion.p>
      </motion.div>
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 px-4">
        <motion.div 
          ref={ref}
          className={`bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-2xl px-8 pt-6 pb-8 mb-4 flex-1 ${
            theme === 'dark' ? 'shadow-blue-900/10' : ''
          } transition-colors duration-300`}
          variants={formVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800 dark:text-blue-400">{texts.checkNewsTitle || defaultTexts.checkNewsTitle}</h2>
          
          {error && (
            <motion.div 
              className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded mb-4"
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
          
          <motion.form 
            onSubmit={handleSubmit} 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="title" 
                className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}
              >
                {texts.newsTitle || defaultTexts.newsTitle}
              </label>
              <motion.input
                className={`
                  w-full px-4 py-3 rounded-lg text-base 
                  ${theme === 'dark' 
                    ? 'bg-gray-800 text-white border border-gray-700 focus:border-blue-500' 
                    : 'bg-white text-gray-800 border border-gray-300 focus:border-blue-400'
                  }
                  focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors
                `}
                id="title"
                type="text"
                placeholder={texts.enterNewsTitle || defaultTexts.enterNewsTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variants={inputVariants}
                initial="blur"
                whileFocus="focus"
                whileTap="focus"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
                {texts.newsDescription || defaultTexts.newsDescription}
              </label>
              <motion.textarea
                className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                id="description"
                placeholder={texts.enterNewsDescription || defaultTexts.enterNewsDescription}
                rows="7"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variants={inputVariants}
                initial="blur"
                whileFocus="focus"
                whileTap="focus"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center justify-center pt-2">
              <motion.button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3 px-6 rounded-lg font-bold text-white text-lg
                  ${theme === 'dark'
                    ? loading 
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-blue-700'
                    : loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border border-blue-400'
                  }
                  transition-all duration-300 shadow-md hover:shadow-lg
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading 
                  ? <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {texts.analyzing || defaultTexts.analyzing}
                    </div>
                  : texts.analyzeNews || defaultTexts.analyzeNews
                }
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {result && (
            <motion.div 
              key="result"
              className="flex-1"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div 
                className={`bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-2xl p-6 mb-4 border-t-8 ${
                  result.result 
                    ? 'border-green-500' 
                    : 'border-red-500'
                } transition-colors duration-300 border border-gray-200 dark:border-gray-700`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {texts.analysisResult || defaultTexts.analysisResult}
                  </h3>
                  <div className={`px-4 py-1.5 rounded-full text-white font-semibold ${
                    result.result ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {result.result ? (texts.real || defaultTexts.real) : (texts.fake || defaultTexts.fake)}
                  </div>
                </div>
                
                <div className={`mb-6 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                    <div>
                      <h4 className={`text-sm font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {texts.analyzedNews || defaultTexts.analyzedNews}
                      </h4>
                      <h3 className={`text-lg font-bold mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {result.title}
                      </h3>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-start sm:items-end flex-col">
                      <span className={`text-sm font-semibold uppercase ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {texts.confidenceScore || defaultTexts.confidenceScore}
                      </span>
                      <div className={`text-2xl font-bold ${
                        result.result ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {result.confidencePercentage}%
                      </div>
                    </div>
                  </div>
                </div>
                
                <h4 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {texts.detailedAnalysis || defaultTexts.detailedAnalysis}
                </h4>
                <div className={`font-mono text-sm whitespace-pre-line rounded-lg p-4 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 text-gray-300 border border-gray-700' 
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}>
                  {result.analysis}
                </div>
                
                <motion.div 
                  className="mt-6 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.5
                  }}
                >
                  {result.result ? (
                    <div className="w-32">
                      <Lottie animationData={checkAnimation} loop={false} />
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ rotate: 0 }}
                      animate={{ 
                        rotate: [0, 5, -5, 5, -5, 0],
                        scale: [1, 1.1, 1] 
                      }}
                      transition={{ 
                        duration: 0.8,
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        repeat: 1, 
                        repeatDelay: 0.5
                      }}
                      className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500"
                    >
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div 
        className="w-full max-w-4xl px-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className={`bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 p-4 rounded-lg shadow-sm transition-colors duration-300`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                {texts.aiInfoText || defaultTexts.aiInfoText}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckNews; 