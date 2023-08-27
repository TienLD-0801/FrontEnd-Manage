import { ReactNode, createContext, useEffect, useState } from 'react';

interface AlertDialogContextProps {
  isOpen: boolean;
  show: (msg: string, isSuccess: boolean) => void;
  message: string;
  isSuccess: boolean;
}

interface AlertDialogProviderProps {
  children: ReactNode;
}

const AlertDialogContext = createContext<AlertDialogContextProps>({
  isOpen: false,
  show: () => null,
  message: '',
  isSuccess: false,
});

const AlertDialogProvider = ({ children }: AlertDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1050);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const show = (message: string, isSuccess: boolean) => {
    setIsOpen(true);
    setIsSuccess(isSuccess);
    setMessage(message);
  };

  const value = {
    message,
    isOpen,
    show,
    isSuccess,
  };

  return (
    <AlertDialogContext.Provider value={value}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export { AlertDialogContext, AlertDialogProvider };
