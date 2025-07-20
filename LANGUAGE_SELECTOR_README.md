# Language Selector System

This document explains how to implement and use the language selector system that dynamically changes website content based on the selected language using data attributes.

## Overview

The language selector system provides:
- **25+ supported languages** including English, Spanish, French, German, Chinese, Japanese, Korean, Arabic, Hindi, Russian, and more
- **Automatic language detection** from browser settings
- **Local storage persistence** of language preferences
- **Parameter substitution** for dynamic content (e.g., "Hello, {name}!")
- **Fallback to English** when translations are missing
- **React Context integration** for React applications
- **Vanilla JavaScript support** for non-React projects

## Quick Start

### 1. Basic HTML Implementation

Add `data-key` attributes to translatable elements:

```html
<h1 data-key="header.title">Welcome to our site</h1>
<p data-key="main.description">This is translatable content</p>
<button data-key="button.submit">Submit</button>
```

### 2. JavaScript Implementation

```javascript
// Include the language selector utility
import { updatePageLanguage, initializeLanguageSelector } from './utils/languageSelector.js';

// Initialize the language selector
initializeLanguageSelector('en'); // Default language

// Change language programmatically
updatePageLanguage('es'); // Changes to Spanish
```

### 3. React Implementation

```jsx
import { useLanguage } from './context/LanguageContext';

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('header.title')}</h1>
      <p>{t('main.description')}</p>
      <button onClick={() => changeLanguage('es')}>
        {t('button.changeLanguage')}
      </button>
    </div>
  );
}
```

## File Structure

```
src/
├── translations/
│   └── translations.js          # Translation data
├── context/
│   └── LanguageContext.js       # React context for language management
├── utils/
│   └── languageSelector.js      # Vanilla JS utilities
└── pages/
    └── Home.js                  # Example component with data attributes
```

## Translation System

### Translation Keys

Use hierarchical keys for organization:

```javascript
{
  "header.title": "Welcome",
  "header.nav.home": "Home",
  "header.nav.about": "About",
  "main.content.description": "Description text",
  "footer.copyright": "© 2024 Company"
}
```

### Parameter Substitution

Support dynamic content with parameters:

```html
<!-- HTML -->
<span data-key="welcome.message" data-params='{"name": "John", "count": 5}'>
  Welcome, John! You have 5 items.
</span>
```

```javascript
// Translation
{
  "welcome.message": "Welcome, {name}! You have {count} items."
}
```

### React Usage with Parameters

```jsx
const { t } = useLanguage();

// With parameters
<p>{t('welcome.message', { name: 'John', count: 5 })}</p>
```

## Supported Languages

The system supports 25+ languages:

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| es | Spanish | Español |
| fr | French | Français |
| de | German | Deutsch |
| zh | Chinese (Simplified) | 中文 |
| ja | Japanese | 日本語 |
| ko | Korean | 한국어 |
| ar | Arabic | العربية |
| hi | Hindi | हिन्दी |
| ru | Russian | Русский |
| pt | Portuguese | Português |
| it | Italian | Italiano |
| nl | Dutch | Nederlands |
| tr | Turkish | Türkçe |
| fa | Persian | فارسی |
| pl | Polish | Polski |
| th | Thai | ไทย |
| ms | Malay | Bahasa Melayu |
| id | Indonesian | Bahasa Indonesia |
| vi | Vietnamese | Tiếng Việt |
| sw | Swahili | Kiswahili |
| bn | Bengali | বাংলা |
| ur | Urdu | اردو |
| ta | Tamil | தமிழ் |
| te | Telugu | తెలుగు |

## API Reference

### Vanilla JavaScript Functions

#### `updatePageLanguage(languageCode)`
Updates all elements with `data-key` attributes to display translated content.

```javascript
updatePageLanguage('es'); // Changes page to Spanish
```

#### `initializeLanguageSelector(defaultLanguage)`
Sets up event listeners and initializes the language selector.

```javascript
initializeLanguageSelector('en'); // Initialize with English
```

#### `getCurrentLanguage()`
Returns the current language code from localStorage or browser settings.

```javascript
const currentLang = getCurrentLanguage(); // Returns 'en', 'es', etc.
```

### React Context Functions

#### `useLanguage()`
React hook that provides language functionality.

```jsx
const { 
  currentLanguage,    // Current language code
  changeLanguage,     // Function to change language
  t,                 // Translation function
  getLanguages       // Get available languages
} = useLanguage();
```

#### `t(key, params)`
Translation function with parameter support.

```jsx
const { t } = useLanguage();

// Simple translation
<p>{t('welcome.message')}</p>

// With parameters
<p>{t('welcome.message', { name: 'John' })}</p>
```

#### `changeLanguage(languageCode)`
Changes the current language.

```jsx
const { changeLanguage } = useLanguage();

<button onClick={() => changeLanguage('es')}>
  Switch to Spanish
</button>
```

## Data Attributes Reference

### `data-key`
Specifies the translation key for the element.

```html
<h1 data-key="page.title">Page Title</h1>
```

### `data-params`
Specifies parameters for parameter substitution (JSON format).

```html
<span data-key="welcome.message" data-params='{"name": "John", "count": 5}'>
  Welcome, John! You have 5 items.
</span>
```

### `data-update-placeholder`
For input elements, updates placeholder instead of value.

```html
<input 
  type="text" 
  data-key="form.email" 
  data-update-placeholder 
  placeholder="Enter your email"
/>
```

### `data-language-selector`
For language selector buttons.

```html
<button data-language-selector="es">Español</button>
```

## Examples

### Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title data-key="page.title">My Website</title>
</head>
<body>
    <header>
        <h1 data-key="header.title">Welcome to our site</h1>
        <nav>
            <a href="#" data-key="nav.home">Home</a>
            <a href="#" data-key="nav.about">About</a>
        </nav>
    </header>
    
    <main>
        <p data-key="main.description">This is our main content.</p>
        <span data-key="welcome.user" data-params='{"name": "John"}'>
            Welcome, John!
        </span>
    </main>
    
    <div class="language-selector">
        <button data-language-selector="en">English</button>
        <button data-language-selector="es">Español</button>
        <button data-language-selector="fr">Français</button>
    </div>
    
    <script src="utils/languageSelector.js"></script>
    <script>
        initializeLanguageSelector('en');
    </script>
</body>
</html>
```

### React Component Example

```jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function WelcomePage() {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const user = { name: 'John', items: 5 };
  
  return (
    <div>
      <h1 data-key="page.title">{t('page.title')}</h1>
      
      <p data-key="welcome.message" data-params={JSON.stringify(user)}>
        {t('welcome.message', user)}
      </p>
      
      <div className="language-selector">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
        <button onClick={() => changeLanguage('fr')}>Français</button>
      </div>
      
      <p>Current language: {currentLanguage}</p>
    </div>
  );
}
```

## Best Practices

### 1. Key Naming Convention
Use hierarchical keys for better organization:
```
header.title
header.nav.home
main.content.description
footer.copyright
```

### 2. Parameter Usage
Use parameters for dynamic content:
```javascript
// Good
"welcome.message": "Welcome, {name}! You have {count} items."

// Avoid
"welcome.john": "Welcome, John! You have 5 items."
```

### 3. Fallback Strategy
Always provide English translations as fallback:
```javascript
const translation = translations[language]?.[key] || translations['en'][key] || key;
```

### 4. Performance
- Use React Context for React applications
- Use vanilla JavaScript utilities for non-React projects
- Cache translations in localStorage for better performance

### 5. Accessibility
- Update `lang` attribute on HTML element
- Provide proper ARIA labels for language selectors
- Ensure keyboard navigation works

## Troubleshooting

### Common Issues

1. **Translations not updating**
   - Check that `data-key` attributes are correctly set
   - Verify translation keys exist in the translations object
   - Ensure `updatePageLanguage()` is called after language change

2. **Parameters not working**
   - Verify `data-params` contains valid JSON
   - Check parameter names match translation placeholders
   - Ensure parameters are passed correctly to `t()` function

3. **React context not working**
   - Ensure `LanguageProvider` wraps your app
   - Check that `useLanguage()` is called within provider
   - Verify context is properly imported

### Debug Mode

Enable debug logging:

```javascript
// Add to your code
const DEBUG = true;

if (DEBUG) {
  console.log('Current language:', currentLanguage);
  console.log('Translation key:', key);
  console.log('Translation result:', translation);
}
```

## Demo

Check out the demo file at `public/language-demo.html` to see the language selector in action with various examples and use cases.

## Contributing

To add new languages or improve translations:

1. Add new language translations to `translations/translations.js`
2. Update language names in `getLanguageName()` function
3. Add language regions in `getLanguageRegion()` function
4. Test with the demo page

## License

This language selector system is part of the QUIZZ project and follows the same licensing terms. 