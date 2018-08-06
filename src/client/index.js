import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { client } from '../reducers';
import { Provider } from 'react-redux';

import HtmlStyle from './components/Html/Style.less';
import AppStyle from './components/App/Style.less';
import gamespace from './components/Gamespace/Style.less';
import signin from './components/Forms/SignIn/Style.less';
import playersList from './components/Gamespace/BottomNav/PlayersList/Style.less';

let initialData = document.getElementById('initial-data').getAttribute('data-json');
initialData = typeof initialData === 'string' ? JSON.parse(initialData) : {};

const store = createStore(client, initialData.store);

ReactDOM.hydrate((
   <Provider store={store}>
      <App />
   </Provider>
), document.getElementById('root'));
