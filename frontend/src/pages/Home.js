import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import animationData from '../assets/news-animation.json';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme } = useTheme();
  const { texts } = useLanguage() || {};
  
  // Default translations if context not loaded yet
  const defaultTexts = {
    detectFakeNews: 'Detect Fake News',
    withAI: 'With AI',
    aiPowered: 'Harness the power of AI to identify misinformation and protect yourself from fake news.',
    checkNewsNow: 'Check News Now',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    howItWorks: 'How It Works',
    enterNewsDetails: 'Enter News Details',
    inputNewsDescription: 'Input the title and description of the news article you want to verify',
    aiAnalysis: 'AI Analysis',
    aiAnalysisDescription: 'Our advanced AI analyzes the content and checks for signs of misinformation',
    getResults: 'Get Results',
    getResultsDescription: 'Receive a detailed report on whether the news is real or fake, with confidence score',
    whyChooseUs: 'Why Choose Us',
    accuracy: 'Accuracy',
    accuracyDescription: 'Powered by advanced AI technology for reliable results',
    easyToUse: 'Easy to Use',
    easyToUseDescription: 'Simple interface that anyone can understand',
    historyTracking: 'History Tracking',
    historyTrackingDescription: 'Keep track of all your previous news checks',
    fightMisinformation: 'Fight Misinformation',
    fightMisinformationDescription: 'Help promote truth and accuracy in media',
    byTheNumbers: 'By The Numbers',
    accuracyRate: 'Accuracy Rate',
    articlesAnalyzed: 'Articles Analyzed',
    users: 'Users',
    support: 'Support',
    testimonials: 'Testimonials',
    readyToStart: 'Ready to start checking news?',
    createAccount: 'Create your free account today',
    whatOurUsersSay: 'What Our Users Say',
    testimonial1: 'Sarah J.',
    testimonial2: 'Michael T.',
    testimonial3: 'Emily R.',
    journalist: 'Journalist',
    universityProfessor: 'University Professor',
    communicationsDirector: 'Communications Director',
    whyUseFakeNewsDetector: 'Why Use Fake News Detector?',
    platformDescription: 'Our advanced AI-powered platform helps you make informed decisions about the content you consume and share.'
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  // Features data
  const howItWorks = [
    {
      title: texts?.enterNewsDetails || defaultTexts.enterNewsDetails,
      description: texts?.inputNewsDescription || defaultTexts.inputNewsDescription,
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: texts?.aiAnalysis || defaultTexts.aiAnalysis,
      description: texts?.aiAnalysisDescription || defaultTexts.aiAnalysisDescription,
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: texts?.getResults || defaultTexts.getResults,
      description: texts?.getResultsDescription || defaultTexts.getResultsDescription,
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const benefits = [
    {
      title: texts?.accuracy || defaultTexts.accuracy,
      description: texts?.accuracyDescription || defaultTexts.accuracyDescription,
      icon: (
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: texts?.easyToUse || defaultTexts.easyToUse,
      description: texts?.easyToUseDescription || defaultTexts.easyToUseDescription,
      icon: (
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: texts?.historyTracking || defaultTexts.historyTracking,
      description: texts?.historyTrackingDescription || defaultTexts.historyTrackingDescription,
      icon: (
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: texts?.fightMisinformation || defaultTexts.fightMisinformation,
      description: texts?.fightMisinformationDescription || defaultTexts.fightMisinformationDescription,
      icon: (
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    }
  ];

  // Stats data
  const stats = [
    { value: "99.7%", label: texts?.accuracyRate || defaultTexts.accuracyRate },
    { value: "10K+", label: texts?.articlesAnalyzed || defaultTexts.articlesAnalyzed },
    { value: "5K+", label: texts?.users || defaultTexts.users },
    { value: "24/7", label: texts?.support || defaultTexts.support }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "This tool has completely changed how I verify news before sharing. It's become an essential part of my daily media consumption.",
      author: "Sarah J.",
      role: "Journalist"
    },
    {
      quote: "As an educator, I teach my students to use Fake News Detector to develop critical thinking and media literacy skills.",
      author: "Michael T.",
      role: "University Professor"
    },
    {
      quote: "The accuracy of the AI detection is impressive. It has helped our organization maintain credibility in all our communications.",
      author: "Emily R.",
      role: "Communications Director"
    }
  ];

  // Use intersection observer for animations
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className={`flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white"
                variants={itemVariants}
              >
                <span className="block">{texts?.detectFakeNews || defaultTexts.detectFakeNews}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                  {texts?.withAI || defaultTexts.withAI}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-blue-100 mb-8"
                variants={itemVariants}
              >
                {texts?.aiPowered || defaultTexts.aiPowered}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
                variants={itemVariants}
              >
                {currentUser ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/check-news" className="inline-block py-3 px-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-cyan-400">
                      {texts?.checkNewsNow || defaultTexts.checkNewsNow}
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to="/register" className="inline-block py-3 px-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                        {texts?.getStarted || defaultTexts.getStarted}
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a href="#how-it-works" className="inline-block py-3 px-8 rounded-lg bg-transparent border-2 border-cyan-300 text-white font-bold hover:bg-blue-900/50 transition-all duration-300">
                        {texts?.learnMore || defaultTexts.learnMore}
                      </a>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
            
            <motion.div
              className="md:w-1/2 px-4"
              variants={itemVariants}
            >
              <div className="max-w-md mx-auto">
                <Lottie 
                  animationData={animationData} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            ref={ref1}
            variants={staggerContainer}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md"
                variants={fadeInUpVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <motion.div 
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUpVariants}
              className="text-3xl md:text-4xl font-bold mb-4 dark:text-white"
            >
              {texts?.howItWorks || defaultTexts.howItWorks}
            </motion.h2>
            <motion.div 
              variants={fadeInUpVariants}
              className="w-24 h-1 bg-blue-600 mx-auto mb-8"
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
          >
            {howItWorks.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-blue-800 bg-opacity-50 rounded-2xl p-8 text-center backdrop-blur-sm border border-blue-700"
                variants={fadeInUpVariants}
                whileHover={{ y: -10, backgroundColor: "rgba(30, 64, 175, 0.7)" }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-blue-600 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{index + 1}. {item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            ref={ref3}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {texts?.whatOurUsersSay || defaultTexts.whatOurUsersSay || "What Our Users Say"}
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
          >
            {/* Первый отзыв */}
            <motion.div 
              className={`rounded-xl p-8 shadow-lg relative ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}
              variants={fadeInUpVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                </svg>
              </div>
              <p className={`italic mb-6 pt-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {texts?.testimonial1 || testimonials[0].quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <div className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    Sarah J.
                  </div>
                  <div className="text-sm text-blue-500">
                    {texts?.journalist || testimonials[0].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Второй отзыв */}
            <motion.div 
              className={`rounded-xl p-8 shadow-lg relative ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}
              variants={fadeInUpVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                </svg>
              </div>
              <p className={`italic mb-6 pt-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {texts?.testimonial2 || testimonials[1].quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <div className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    Michael T.
                  </div>
                  <div className="text-sm text-blue-500">
                    {texts?.universityProfessor || testimonials[1].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Третий отзыв */}
            <motion.div 
              className={`rounded-xl p-8 shadow-lg relative ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}
              variants={fadeInUpVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
                </svg>
              </div>
              <p className={`italic mb-6 pt-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {texts?.testimonial3 || testimonials[2].quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-xl mr-4">
                  E
                </div>
                <div>
                  <div className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    Emily R.
                  </div>
                  <div className="text-sm text-blue-500">
                    {texts?.communicationsDirector || testimonials[2].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            ref={ref4}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {texts?.whyUseFakeNewsDetector || defaultTexts.whyUseFakeNewsDetector || "Why Use Fake News Detector?"}
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            <p className={`max-w-3xl mx-auto mt-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {texts?.platformDescription || "Our advanced AI-powered platform helps you make informed decisions about the content you consume and share."}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {benefit.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-t border-b border-blue-500">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            variants={fadeInUpVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {texts?.readyToStart || defaultTexts.readyToStart}
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariants}
            className="text-xl mb-8 opacity-100 max-w-2xl mx-auto"
          >
            {texts?.createAccount || defaultTexts.createAccount}
          </motion.p>
          
          {!currentUser && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUpVariants}
            >
              <Link to="/register" className="inline-block py-3 px-10 rounded-lg bg-white text-blue-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-2 border-blue-300">
                {texts?.getStarted || defaultTexts.getStarted}
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 