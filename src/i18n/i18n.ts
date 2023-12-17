import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/i18n/en-US';
import vn from '@/i18n/en-VN';
import ch from '@/i18n/en-CH';
import ja from '@/i18n/en-JA';
import { store } from '@/stores';

/* A way to import multiple language files to resources. */
const resources = {
  en,
  vn,
  ch,
  ja,
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
  switch (state) {
    case 'UK':
      i18n.changeLanguage('en');
      break;
    case 'VN':
      i18n.changeLanguage('vn');
      break;
    case 'CH':
      i18n.changeLanguage('ch');
      break;
    case 'JA':
      i18n.changeLanguage('ja');
      break;
    default:
      i18n.changeLanguage('en');
      break;
  }
});

export default i18n;
