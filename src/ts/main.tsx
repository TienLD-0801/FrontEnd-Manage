// Import React and ReactDOM
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
//import scss
import '@/css/index.scss';
// Import I18n
import '@/i18n/i18n';

// Import App Component
import MyApp from '@/components/app';
import { AlertDialogProvider } from '@/context/AlertDialogContext';
import AlertDialog from '@/components/atoms/AlertDialog/AlertDialog';
import theme from '@/ts/theme';
import { LoadingProvider } from '@/context/LoadingContext';
import Loading from '@/components/atoms/Loading/Loading';

// Mount React App
const root = createRoot(document.getElementById('root')!);

root.render(
  <LoadingProvider>
    <AlertDialogProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
      <AlertDialog />
      <Loading />
    </AlertDialogProvider>
  </LoadingProvider>,
);
