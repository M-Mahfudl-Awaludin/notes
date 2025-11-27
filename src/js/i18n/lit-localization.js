import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from './locales.js';

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./locales/${locale}.js`)
});

export const setLocaleFromStorage = async () => {
  const saved = localStorage.getItem('storyAppLang');
  if (saved && (targetLocales.includes(saved) || saved === sourceLocale)) {
    await setLocale(saved);
  }
};

if (typeof window !== 'undefined') {
  setLocaleFromStorage();
}
