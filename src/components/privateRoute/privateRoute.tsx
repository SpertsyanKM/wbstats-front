import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {AuthService} from '../../modules/auth';
import {ROUTE_AUTH} from '../../utils/route';

type Props = {};

const PrivateRoute: React.FC<Props> = () => {
  const isAuthorized = AuthService.isAuthorized();
  return isAuthorized ? <Outlet /> : <Navigate to={ROUTE_AUTH} />;
};

export default PrivateRoute;
