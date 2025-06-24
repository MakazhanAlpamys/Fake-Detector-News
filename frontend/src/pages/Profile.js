import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const { theme } = useTheme();
  const { texts = {} } = useLanguage() || {};
  
  // Значения по умолчанию, если переводы не загружены
  const defaultTexts = {
    yourProfile: 'Your Profile',
    email: 'Email',
    role: 'Role',
    nickname: 'Nickname',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    updating: 'Updating...',
    updateProfile: 'Update Profile'
  };
  
  const [nickname, setNickname] = useState(currentUser?.nickname || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is trying to change password
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        return setError('Current password is required to change password');
      }
      
      if (newPassword !== confirmPassword) {
        return setError('New passwords do not match');
      }
      
      // Validate password strength if changing password
      if (newPassword) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
          return setError('New password must be at least 8 characters and include uppercase, lowercase, number and special character');
        }
      }
    }
    
    // Check if anything is actually being updated
    if (nickname === currentUser.nickname && !newPassword) {
      return setError('No changes detected');
    }
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await updateProfile(
        nickname !== currentUser.nickname ? nickname : null, 
        newPassword ? currentPassword : null, 
        newPassword || null
      );
      
      setSuccess('Profile updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
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
      <div className="w-full max-w-md">
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700 shadow-lg text-white' 
            : 'bg-white border border-gray-200 shadow-lg text-gray-800'
        } rounded-lg px-8 pt-6 pb-8 mb-6`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {texts.yourProfile || defaultTexts.yourProfile}
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
          
          <div className={`mb-6 p-4 rounded-lg ${
                 theme === 'dark' 
              ? 'bg-gray-700 border border-gray-600' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            <div className="mb-2">
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {texts.email || defaultTexts.email}:
              </span>{' '}
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {currentUser?.email}
              </span>
            </div>
            <div>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {texts.role || defaultTexts.role}:
              </span>{' '}
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {currentUser?.role}
              </span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`} htmlFor="nickname">
                {texts.nickname || defaultTexts.nickname}
              </label>
              <input
                className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                }`}
                id="nickname"
                type="text"
                placeholder={texts.nickname || defaultTexts.nickname}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            
            <div className={`border-t my-6 pt-4 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {texts.changePassword || defaultTexts.changePassword}
              </h3>
              
              <div className="mb-4">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`} htmlFor="currentPassword">
                  {texts.currentPassword || defaultTexts.currentPassword}
                </label>
                <input
                  className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                  }`}
                  id="currentPassword"
                  type="password"
                  placeholder={texts.currentPassword || defaultTexts.currentPassword}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`} htmlFor="newPassword">
                  {texts.newPassword || defaultTexts.newPassword}
                </label>
                <input
                  className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                  }`}
                  id="newPassword"
                  type="password"
                  placeholder={texts.newPassword || defaultTexts.newPassword}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`} htmlFor="confirmPassword">
                  {texts.confirmNewPassword || defaultTexts.confirmNewPassword}
                </label>
                <input
                  className={`appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                  }`}
                  id="confirmPassword"
                  type="password"
                  placeholder={texts.confirmNewPassword || defaultTexts.confirmNewPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
                {loading 
                  ? (texts.updating || defaultTexts.updating)
                  : (texts.updateProfile || defaultTexts.updateProfile)
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 