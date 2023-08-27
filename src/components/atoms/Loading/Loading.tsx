import ReactDOM from 'react-dom';
import { useContext } from 'react';
import { CircularProgress } from '@mui/material';
import { LoadingContext } from '@/context/LoadingContext';
import './Loading.scss';

const Loading = () => {
  const checkLoading = useContext(LoadingContext);
  return ReactDOM.createPortal(
    checkLoading.isLoading && (
      <div className="loading">
        <CircularProgress size={80} color="success" />,
      </div>
    ),
    document.querySelector('#root')!,
  );
};

export default Loading;
