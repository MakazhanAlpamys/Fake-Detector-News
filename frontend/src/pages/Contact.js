import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Значения по умолчанию, если переводы не загружены
  const defaultTexts = {
    contactUs: 'Contact Us',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    helpQuestion: 'Questions? We\'re here to help!',
    emailUs: 'Email us at:'
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await axios.post('http://localhost:5000/api/contact', {
        name,
        email,
        message
      });
      
      setSuccess('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`flex justify-center py-8 px-4 min-h-screen ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="w-full max-w-xl">
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700 shadow-lg text-white' 
            : 'bg-white border border-gray-200 shadow-lg text-gray-800'
        } rounded-lg px-8 pt-6 pb-8 mb-6`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {texts.contactUs || defaultTexts.contactUs}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`} htmlFor="name">
                {texts.name || defaultTexts.name}
              </label>
              <input
                className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                }`}
                id="name"
                type="text"
                placeholder={texts.yourName || defaultTexts.yourName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
                placeholder={texts.yourEmail || defaultTexts.yourEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`} htmlFor="message">
                {texts.message || defaultTexts.message}
              </label>
              <textarea
                className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                }`}
                id="message"
                placeholder={texts.yourMessage || defaultTexts.yourMessage}
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
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
                {loading 
                  ? (texts.sending || defaultTexts.sending)
                  : (texts.sendMessage || defaultTexts.sendMessage)
                }
              </button>
            </div>
          </form>
        </div>
        
        <div className={`text-center ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <p className="mb-2">{texts.helpQuestion || defaultTexts.helpQuestion}</p>
          <p>
            {texts.emailUs || defaultTexts.emailUs} 
            <a href="mailto:support@fakenewsdetector.com" className={`${
              theme === 'dark' 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            } font-medium`}>
              support@fakenewsdetector.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact; 