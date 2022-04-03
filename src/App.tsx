import React from 'react';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {Container} from './appStyles';
import Home from './pages/home';
import Header from './components/header';
import Goods from './pages/goods';
import {ROUTE_AUTH, ROUTE_GOOD, ROUTE_GOODS, ROUTE_HOME, ROUTE_REGISTRATION} from './utils/route';
import Good from './pages/good';
import {AuthService} from './modules/auth';
import store from './modules/store';
import Auth from './pages/auth';
import PrivateRoute from './components/privateRoute';
import {createBrowserHistory} from 'history';
import {ApiErrorHandler} from './utils/api/error/errorHandler';

const history = createBrowserHistory();
AuthService.init(store);
ApiErrorHandler.init(history);

function App() {
  return (
    <HistoryRouter history={history}>
      <Container>
        <Header />
        <Routes>
          <Route path={ROUTE_AUTH} element={<Auth />}/>
          <Route path={ROUTE_REGISTRATION} element={<Auth isRegistration />}/>
          <Route path={ROUTE_GOODS} element={<PrivateRoute />}>
            <Route path={ROUTE_GOODS} element={<Goods />}/>
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
