import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container} from './appStyles';

function App() {
  return (
    <Container>
      <Routes>
        <Route path={'goods'} element={"Goods"}/>
      </Routes>
    </Container>
  );
}

export default App;
