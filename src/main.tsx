// Import React and ReactDOM
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
//import scss
import '@/assets/css/index.scss';
// Import I18n
import '@/i18n/i18n';

// Import App Component
import MyApp from '@/components/app';
import { AlertDialogProvider } from '@/context/AlertDialogContext';
import AlertDialog from '@/components/atoms/AlertDialog/AlertDialog';
import theme from '@/theme';
import { LoadingProvider } from '@/context/LoadingContext';
import Loading from '@/components/atoms/Loading/Loading';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Mount React App
const root = createRoot(document.getElementById('root')!);

root.render(
  <LoadingProvider>
    <AlertDialogProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MyApp />
        </LocalizationProvider>
      </ThemeProvider>
      <AlertDialog />
      <Loading />
    </AlertDialogProvider>
  </LoadingProvider>,
);
