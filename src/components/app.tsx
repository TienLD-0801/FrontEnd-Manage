import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { myRouter } from '@/ts/router';

const MyApp = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={myRouter} />
    </Provider>
  );
};

export default MyApp;
