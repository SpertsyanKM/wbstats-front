import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {ROUTE_AUTH, ROUTE_SHOP_REGISTRATION} from '../../utils/route';
import {useSelector} from 'react-redux';
import {selectShop} from '../../modules/shop/selectors';
import {useIsAuthorized} from '../../modules/auth/hooks';

type Props = {
  shopRequired?: boolean;
};

const PrivateRoute: React.FC<Props> = ({shopRequired = true}) => {
  const isAuthorized = useIsAuthorized();
  const shop = useSelector(selectShop);

  if (!isAuthorized) {
    return <Navigate to={ROUTE_AUTH}/>;
  }
  if (shopRequired && !shop) {
    return <Navigate to={ROUTE_SHOP_REGISTRATION} />
  }
  return <Outlet />;
};

export default PrivateRoute;
