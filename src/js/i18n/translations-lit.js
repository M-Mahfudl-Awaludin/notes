let currentLocale = localStorage.getItem('storyAppLang') || 'id';
let translations = {};

export async function loadTranslations(locale) {
  const module = await import(`./locales/${locale}.js`);
  translations = module.default;
}

export async function setLang(locale) {
  currentLocale = locale;
  localStorage.setItem('storyAppLang', locale);
  await loadTranslations(locale);

  window.dispatchEvent(new CustomEvent('lang-changed'));
}

export function getCurrentLocale() {
  return currentLocale;
}

export function t(key) {
  return translations[key] || key;
}

// init
await loadTranslations(currentLocale);
