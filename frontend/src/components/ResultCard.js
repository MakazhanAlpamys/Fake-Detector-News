import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const defaultTexts = {
  analysisResult: 'Analysis Result',
  real: 'REAL',
  fake: 'FAKE',
  confidenceScore: 'Confidence Score',
  analyzedNews: 'Analyzed Article',
  detailedAnalysis: 'Analysis Details'
};

const ResultCard = ({ result }) => {
  const { theme } = useTheme();
  const { texts } = useLanguage();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg rounded-2xl p-6 mb-4 
        border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        ${result.result ? 'border-t-8 border-t-green-500' : 'border-t-8 border-t-red-500'}
        transition-colors duration-300
      `}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          {texts.analysisResult || defaultTexts.analysisResult}
        </h3>
        <div className={`
          px-4 py-1.5 rounded-full text-white font-semibold
          ${result.result ? 'bg-green-500' : 'bg-red-500'}
        `}>
          {result.result 
            ? (texts.real || defaultTexts.real) 
            : (texts.fake || defaultTexts.fake)
          }
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
    </motion.div>
  );
};

export default ResultCard; 