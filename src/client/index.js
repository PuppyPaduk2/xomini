import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import HtmlStyle from './components/Html/Html.less';
import AppStyle from  './components/App/App.less';
import GridColorsStyle from './components/GridColors/GridColors.less';
import PlayersStyle from './components/Players/Players.less';
import PlayerInStyle from './components/PlayerIn/PlayerIn.less';
import GameSpaceStyle from './components/GameSpace/GameSpace.less';

let initialData = document.getElementById('initial-data').getAttribute('data-json');
initialData = typeof initialData === 'string' ? JSON.parse(initialData) : {};

ReactDOM.hydrate(<App {...initialData}/>, document.getElementById('root'));
