import { ReactNode, createContext, useState } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  show: () => void;
  hidden: () => void;
}

interface ALoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  show: () => {},
  hidden: () => {},
});

const LoadingProvider = ({ children }: ALoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const show = () => {
    setIsLoading(true);
  };

  const hidden = () => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  };
  const value = {
    isLoading,
    hidden,
    show,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
