import React from 'react';
import NAVbar from './NAVBAR/nav'

//store
import { store } from './store';
import { Provider } from 'react-redux';
//actions

const App = () => (

  <Provider store={store}>

    <div>
      <NAVbar />
    </div>

  </Provider>

);

export default App;
