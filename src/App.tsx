import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container} from './appStyles';
import Home from './pages/home';
import Header from './components/header';
import Goods from './pages/goods';
import {ROUTE_GOOD, ROUTE_GOODS, ROUTE_HOME} from './utils/route';
import Good from './pages/good';

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />}/>
        <Route path={ROUTE_GOODS} element={<Goods />}/>
        <Route path={`${ROUTE_GOOD}/:id`} element={<Good />}/>
      </Routes>
    </Container>
  );
}

export default App;
