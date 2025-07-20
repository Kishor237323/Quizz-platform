import { getTranslation } from '../translations/translations';

/**
 * Language selector utility function
 * Updates all elements with data-key attributes to display translated content
 * @param {string} languageCode - The language code (e.g., 'en', 'es', 'fr')
 */
export const updatePageLanguage = (languageCode) => {
  // Find all elements with data-key attributes
  const translatableElements = document.querySelectorAll('[data-key]');
  
  translatableElements.forEach(element => {
    const key = element.getAttribute('data-key');
    const params = {};
    
    // Get parameters from data attributes
    const paramAttributes = element.getAttribute('data-params');
    if (paramAttributes) {
      try {
        Object.assign(params, JSON.parse(paramAttributes));
      } catch (e) {
        console.warn('Invalid data-params JSON:', paramAttributes);
      }
    }
    
    // Get the translation
    const translation = getTranslation(languageCode, key, params);
    
    // Update the element content based on its type
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // For form inputs, update placeholder and value
      if (element.hasAttribute('data-update-placeholder')) {
        element.placeholder = translation;
      } else {
        element.value = translation;
      }
    } else if (element.tagName === 'IMG') {
      // For images, update alt text
      element.alt = translation;
    } else if (element.tagName === 'A') {
      // For links, update title attribute
      element.title = translation;
    } else {
      // For other elements, update text content
      element.textContent = translation;
    }
  });
  
  // Update document title if it has a data-key
  const titleElement = document.querySelector('title[data-key]');
  if (titleElement) {
    const titleKey = titleElement.getAttribute('data-key');
    const titleTranslation = getTranslation(languageCode, titleKey);
    document.title = titleTranslation;
  }
  
  // Update meta description if it has a data-key
  const metaDescription = document.querySelector('meta[name="description"][data-key]');
  if (metaDescription) {
    const descKey = metaDescription.getAttribute('data-key');
    const descTranslation = getTranslation(languageCode, descKey);
    metaDescription.setAttribute('content', descTranslation);
  }
  
  // Update HTML lang attribute
  document.documentElement.lang = languageCode;
  
  // Dispatch custom event for components that need to react to language changes
  const event = new CustomEvent('languageChanged', {
    detail: { language: languageCode }
  });
  document.dispatchEvent(event);
};

/**
 * Initialize language selector functionality
 * Sets up event listeners for language selector buttons
 * @param {string} defaultLanguage - Default language code
 */
export const initializeLanguageSelector = (defaultLanguage = 'en') => {
  // Set initial language
  updatePageLanguage(defaultLanguage);
  
  // Add event listeners to language selector buttons
  document.addEventListener('click', (event) => {
    if (event.target.matches('[data-language-selector]')) {
      const languageCode = event.target.getAttribute('data-language-selector');
      updatePageLanguage(languageCode);
      
      // Store the selected language in localStorage
      localStorage.setItem('selectedLanguage', languageCode);
      
      // Update any language display elements
      const languageDisplayElements = document.querySelectorAll('[data-current-language]');
      languageDisplayElements.forEach(element => {
        element.textContent = languageCode.toUpperCase();
      });
    }
  });
};

/**
 * Create a language selector dropdown programmatically
 * @param {string} currentLanguage - Current selected language
 * @param {Array} availableLanguages - Array of available language codes
 * @param {string} containerId - ID of the container element
 */
export const createLanguageDropdown = (currentLanguage, availableLanguages, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const dropdown = document.createElement('div');
  dropdown.className = 'language-selector-dropdown';
  dropdown.innerHTML = `
    <button class="language-selector-button" data-language-selector="${currentLanguage}">
      ${currentLanguage.toUpperCase()}
      <span class="dropdown-arrow">▼</span>
    </button>
    <div class="language-dropdown-menu" style="display: none;">
      ${availableLanguages.map(lang => `
        <button class="language-option ${lang === currentLanguage ? 'active' : ''}" 
                data-language-selector="${lang}">
          ${lang.toUpperCase()}
        </button>
      `).join('')}
    </div>
  `;
  
  container.appendChild(dropdown);
  
  // Add dropdown functionality
  const button = dropdown.querySelector('.language-selector-button');
  const menu = dropdown.querySelector('.language-dropdown-menu');
  
  button.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
};

/**
 * Get the current language from localStorage or browser
 * @returns {string} Current language code
 */
export const getCurrentLanguage = () => {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    return savedLanguage;
  }
  
  // Try to detect browser language
  const browserLanguage = navigator.language.split('-')[0];
  const availableLanguages = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ar', 'hi', 'ru', 'pt', 'it', 'nl', 'tr', 'fa', 'pl', 'th', 'ms', 'id', 'vi', 'sw', 'bn', 'ur', 'ta', 'te'];
  
  if (availableLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }
  
  return 'en'; // Default to English
};

/**
 * Set up automatic language detection and initialization
 */
export const setupLanguageDetection = () => {
  const currentLanguage = getCurrentLanguage();
  updatePageLanguage(currentLanguage);
  
  // Listen for language changes from other parts of the app
  document.addEventListener('languageChanged', (event) => {
    const { language } = event.detail;
    updatePageLanguage(language);
  });
}; 