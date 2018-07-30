import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore } from 'redux';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import { add as addUser } from '../reducers/users';

import HtmlStyle from './components/Html/Html.less';
import AppStyle from './components/App/App.less';
import GridColorsStyle from './components/GridColors/GridColors.less';
import PlayersStyle from './components/Players/Players.less';
import PlayerInStyle from './components/PlayerIn/PlayerIn.less';
import GameSpaceStyle from './components/GameSpace/GameSpace.less';

let initialData = document.getElementById('initial-data').getAttribute('data-json');
initialData = typeof initialData === 'string' ? JSON.parse(initialData) : {};

const store = createStore(reducers, initialData.store);

// console.log(store.getState());

// changerStore.subscribe('users', action => {
//    console.log('@users:change', action);
// });

// store.dispatch(addUser('@user', '@roomUser'));
// store.dispatch(addUser('@user', '@roomUser'));

// console.log(store.getState())

ReactDOM.hydrate((
   <Provider store={store}>
      <App />
   </Provider>
), document.getElementById('root'));
