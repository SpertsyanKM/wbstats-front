import React, {useEffect, useState} from 'react';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {Container} from './appStyles';
import Home from './pages/home';
import Header from './components/header';
import Goods from './pages/goods';
import {
  ROUTE_AUTH, ROUTE_FINANCES,
  ROUTE_GOOD,
  ROUTE_GOODS,
  ROUTE_HOME,
  ROUTE_REGISTRATION,
  ROUTE_SHOP_REGISTRATION
} from './utils/route';
import Good from './pages/good';
import {AuthService} from './modules/auth';
import store from './modules/store';
import Auth from './pages/auth';
import PrivateRoute from './components/privateRoute';
import {createBrowserHistory} from 'history';
import {ApiErrorHandler} from './utils/api/error/errorHandler';
import ShopRegistration from './pages/shopRegistration';
import {useDispatch, useSelector} from 'react-redux';
import {selectShop} from './modules/shop/selectors';
import Loader from './components/common/loader';
import {ClientService} from './modules/client';
import {setShop} from './modules/shop';
import {useIsAuthorized} from './modules/auth/hooks';
import Finances from './pages/finances';

const history = createBrowserHistory();
AuthService.init(store);
ApiErrorHandler.init(history);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthorized = useIsAuthorized();
  const shop = useSelector(selectShop);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shop || !isAuthorized) {
      setIsLoading(false);
      return;
    }
    ClientService.fetchMe()
      .then(client => {
        dispatch(setShop(client.shops[0]));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, setIsLoading, shop, isAuthorized]);

  if (isLoading) {
    return <Loader root absolute />;
  }

  return (
    <HistoryRouter history={history}>
      <Container>
        <Header />
        <Routes>
          <Route path={ROUTE_AUTH} element={<Auth />}/>
          <Route path={ROUTE_REGISTRATION} element={<Auth isRegistration />}/>
          <Route path={ROUTE_SHOP_REGISTRATION} element={<PrivateRoute shopRequired={false} />}>
            <Route path={ROUTE_SHOP_REGISTRATION} element={<ShopRegistration />}/>
          </Route>
          <Route path={ROUTE_GOODS} element={<PrivateRoute />}>
            <Route path={ROUTE_GOODS} element={<Goods />}/>
          </Route>
          <Route path={ROUTE_FINANCES} element={<PrivateRoute />}>
            <Route path={ROUTE_FINANCES} element={<Finances />}/>
          </Route>
          <Route path={`${ROUTE_GOOD}/:id`} element={<PrivateRoute />}>
            <Route path={`${ROUTE_GOOD}/:id`} element={<Good />}/>
          </Route>
          <Route path={ROUTE_HOME} element={<Home />}/>
        </Routes>
      </Container>
    </HistoryRouter>
  );
}

export default App;
