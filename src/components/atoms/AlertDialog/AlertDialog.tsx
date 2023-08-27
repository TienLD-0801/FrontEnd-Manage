import { useContext } from 'react';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import ReactDOM from 'react-dom';
import './AlertDialog.scss';

const AlertDialog = () => {
  const alertDialog = useContext(AlertDialogContext);

  return ReactDOM.createPortal(
    alertDialog.isOpen && (
      <div className="alert-dialog">
        <div
          className={`${
            alertDialog.isSuccess
              ? 'alert-dialog__success'
              : 'alert-dialog__error'
          } `}
        >
          <div>{alertDialog.message}</div>
        </div>
      </div>
    ),
    document.querySelector('#root')!,
  );
};

export default AlertDialog;
