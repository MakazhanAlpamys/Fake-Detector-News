import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Default text values if translations aren't loaded yet
  const defaultTexts = {
    home: 'Home',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    appDescription: 'A powerful AI-powered tool to help you identify fake news and misinformation online.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service'
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const footerLinks = [
    { name: texts.home || defaultTexts.home, path: '/' },
    { name: texts.contact || defaultTexts.contact, path: '/contact' },
    { name: texts.login || defaultTexts.login, path: '/login' },
    { name: texts.register || defaultTexts.register, path: '/register' }
  ];
  
  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>,
      url: '#'
    },
    {
      name: 'Facebook',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4 20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z"></path></svg>,
      url: '#'
    },
    {
      name: 'Instagram',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"></path></svg>,
      url: '#'
    }
  ];
  
  return (
    <footer className={`
      w-full 
      py-12 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 border-t border-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-white text-gray-700 border-t border-gray-200'
      }
    `}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* App Description */}
          <div className="mb-6 md:mb-0">
            <Link 
              to="/" 
              className={`flex items-center mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-blue-600'
              }`}
            >
              <div className={`mr-2 rounded-full flex items-center justify-center h-8 w-8 ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-bold text-lg">
                {texts.appName || "Fake News Detector"}
              </span>
            </Link>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {texts.appDescription || defaultTexts.appDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {texts.quickLinks || "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-blue-500'
                  } transition-colors duration-200`}
                >
                  {texts.home || "Home"}
                </Link>
              </li>
              <li>
                <Link 
                  to="/check-news" 
                  className={`${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-blue-500'
                  } transition-colors duration-200`}
                >
                  {texts.checkNews || "Check News"}
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className={`${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-blue-500'
                  } transition-colors duration-200`}
                >
                  {texts.login || "Login"}
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={`${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-blue-500'
                  } transition-colors duration-200`}
                >
                  {texts.register || "Register"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {texts.contactUs || "Contact Us"}
            </h3>
            <ul className="space-y-2">
              <li className={`flex items-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>contact@fakenewsdetector.com</span>
              </li>
              <li className={`flex items-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span>123 Truth Street, Reality City</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {texts.followUs || "Follow Us"}
            </h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white border border-gray-700 bg-gray-800' 
                    : 'text-gray-600 hover:text-blue-500 border border-gray-200 bg-white'
                } p-2 rounded-full transition-colors duration-200`}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                className={`${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white border border-gray-700 bg-gray-800' 
                    : 'text-gray-600 hover:text-blue-500 border border-gray-200 bg-white'
                } p-2 rounded-full transition-colors duration-200`}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className={`${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white border border-gray-700 bg-gray-800' 
                    : 'text-gray-600 hover:text-blue-500 border border-gray-200 bg-white'
                } p-2 rounded-full transition-colors duration-200`}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © 2023 Fake News Detector. {texts.allRightsReserved || "All rights reserved."}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className={`text-sm ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-blue-500'
                } transition-colors duration-200`}
              >
                {texts.privacyPolicy || "Privacy Policy"}
              </Link>
              <Link 
                to="/terms" 
                className={`text-sm ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-blue-500'
                } transition-colors duration-200`}
              >
                {texts.termsOfService || "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 