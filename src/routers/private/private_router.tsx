import { ROUTE_PATH } from '@/shared/constants/constant';
import { RootStatesType } from '@/stores';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRouteLogin = ({ children }: PrivateRouteProps) => {
  const isAuth = useSelector((state: RootStatesType) => state.user.token);
  return !isAuth ? children : <Navigate to={ROUTE_PATH.dashboard} replace />;
};

const PrivateAdmin = ({ children }: PrivateRouteProps) => {
  const isAuth = useSelector((state: RootStatesType) => state.user.token);
  return isAuth ? children : <Navigate to={ROUTE_PATH.login} replace />;
};

export { PrivateAdmin, PrivateRouteLogin };
