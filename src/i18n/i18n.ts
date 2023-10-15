import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/i18n/en-US';
import vn from '@/i18n/en-VN';
import { store } from '@/store';

/* A way to import multiple language files to resources. */
const resources = {
  en,
  vn,
};

/* Initializing the i18n library. */
i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

store.subscribe(() => {
  const state = store.getState().language.value;
  i18n.changeLanguage(state === 'UK' ? 'en' : 'vn');
});

export default i18n;
