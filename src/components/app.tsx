import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/stores';
import { myRouter } from '@/routers/router';

const MyApp = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={myRouter} />
    </Provider>
  );
};

export default MyApp;
