import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomePage from '@/pages/Home';
import NotFoundPage from '@/pages/404';
import Training from '@/pages/Training';
import Introduce from '@/pages/Introduce';
import ListPrice from '@/pages/ListPrice';
import UserPage from '@/pages/auth/UserPage';
import LoginPage from '@/pages/auth/LoginPage';
import { ROUTE_PATH } from '@/shared/constants/constant';
import ProductPage from '@/pages/auth/ProductPage';
import DefaultPage from '@/pages/auth/DefaultPage';
import SchedulePage from '@/pages/auth/SchedulePage';
import CategoryPage from '@/pages/auth/CategoryPage';
import { PrivateAdmin, PrivateRouteLogin } from '@/routers/private/private_router';

const router: RouteObject[] = [
  { path: ROUTE_PATH.index, element: <HomePage /> },
  { path: ROUTE_PATH.introduce, element: <Introduce /> },
  { path: ROUTE_PATH.listprice, element: <ListPrice /> },
  { path: ROUTE_PATH.training, element: <Training /> },
  {
    path: ROUTE_PATH.login,
    element: (
      <PrivateRouteLogin>
        <LoginPage />
      </PrivateRouteLogin>
    ),
  },
  {
    path: ROUTE_PATH.dashboard,
    element: (
      <PrivateAdmin>
        <DefaultPage />
      </PrivateAdmin>
    ),
  },
  {
    path: ROUTE_PATH.category,
    element: (
      <PrivateAdmin>
        <CategoryPage />
      </PrivateAdmin>
    ),
  },
  {
    path: ROUTE_PATH.product,
    element: (
      <PrivateAdmin>
        <ProductPage />
      </PrivateAdmin>
    ),
  },
  {
    path: ROUTE_PATH.schedule,
    element: (
      <PrivateAdmin>
        <SchedulePage />
      </PrivateAdmin>
    ),
  },
  {
    path: ROUTE_PATH.user,
    element: (
      <PrivateAdmin>
        <UserPage />
      </PrivateAdmin>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// myRouter use provider
export const myRouter = createBrowserRouter(router);

// go to next router global
export const goTo = myRouter.navigate;
