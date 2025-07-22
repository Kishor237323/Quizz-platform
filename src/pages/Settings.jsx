import React, { useState, useEffect } from 'react';
import SettingsToggle from '../components/SettingsToggle';
import NewLayout from '../components/NewLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { currentLanguage, changeLanguage, getLanguages } = useLanguage();
  
  const languages = getLanguages();
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Apply theme to document
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    applyTheme(newTheme);
  };

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setShowLangDropdown(false);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) return;
    try {
      await fetch('/api/users/me', { method: 'DELETE', credentials: 'include' });
      await logout();
      navigate('/');
    } catch (err) {
      alert('Failed to delete account. Please try again.');
    }
  };

  return (
    <NewLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Settings
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Customize your experience and preferences
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Appearance
              </h2>
              
              <SettingsToggle
                isDark={isDark}
                onToggle={toggleDarkMode}
                label="Dark Mode"
               
              />
               
              {/* Language Selector */}
              <div className="flex items-center justify-between py-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Language</span>
                <div className="relative">
                  <button
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-300 dark:border-gray-600"
                    onClick={() => setShowLangDropdown((prev) => !prev)}
                  >
                    <span>{selectedLanguage.label} ({selectedLanguage.code})</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showLangDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            selectedLanguage.code === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 font-medium' : ''
                          }`}
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <div className="flex flex-col">
                            <span>{lang.label} <span className="text-xs text-gray-500 dark:text-gray-400">({lang.code})</span></span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{lang.region}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Switch between light and dark themes. Your preference will be saved only for settings.
                </p>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Notifications
              </h2>
              
              <SettingsToggle
                isDark={false}
                onToggle={() => setNotifications(!notifications)}
                label="Push Notifications"
              />
              
              <SettingsToggle
                isDark={false}
                onToggle={() => setEmailUpdates(!emailUpdates)}
                label="Email Updates"
              />
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Control how you receive notifications about quiz results, new features, and updates.
                </p>
              </div>
            </div>



            {/* Quiz Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Quiz Preferences
              </h2>
              
              <SettingsToggle
                isDark={false}
                onToggle={() => setAutoSave(!autoSave)}
                label="Auto-save Progress"
              />
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically save your quiz progress so you can continue where you left off.
                </p>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Account
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">user@example.com</p>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">Password</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last changed 30 days ago</p>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                    Update
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">Delete Account</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account and data</p>
                  </div>
                  <button
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
                    onClick={handleDeleteAccount}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default Settings; 